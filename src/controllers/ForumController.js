import hierarchizeForums from '../helpers/forums/hierarchizeForums';
import isRoleAuthorized from '../helpers/permissions/isRoleAuthorized';
import { Forum, ForumPermission } from '../models';

const permissionsInclude = {
  model: ForumPermission,
  as: 'permissions',
};

const parentForumInclude = {
  model: Forum,
  as: 'parentForum',
};

const subForumsInclude = {
  model: Forum,
  as: 'subForums',
};

export const index = async ctx => {
  const {
    currentUser: { role },
  } = ctx;

  const forums = await Forum.findAll({
    where: {
      isArchived: false,
    },
    include: permissionsInclude,
  });

  ctx.body = { forums: hierarchizeForums(forums, role) };
  ctx.status = 200;
};

export const show = async ctx => {
  const {
    params: { id },
    currentUser: { role },
  } = ctx;

  const forum = await Forum.findByPk(id, {
    include: [parentForumInclude, subForumsInclude, permissionsInclude],
  });

  if (!forum) {
    ctx.throw(404, 'Unable to find forum');
  }

  if (!isRoleAuthorized({ targetRole: forum.permissions.read, currentRole: role })) {
    ctx.throw(403, 'You do not have permission to read this forum');
  }

  ctx.body = { forum };
  ctx.status = 200;
};

export const create = async ctx => {
  const {
    request: { body },
  } = ctx;

  const forum = await Forum.create(body);
  const permissions = await ForumPermission.findByPk(forum.id);

  if (body.parentId && body.copyParentPermissions) {
    const { read, write, manage } = await ForumPermission.findOne({
      where: { forumId: body.parentId },
    });
    await permissions.update({ read, write, manage });
  }

  if (forum) {
    ctx.body = { forum: { ...forum.toJSON(), permissions } };
    ctx.status = 200;
  }
};

export const update = async ctx => {
  const {
    params: { id },
    request: { body },
  } = ctx;

  const forum = await Forum.findByPk(id);

  if (!forum) {
    ctx.throw(404, 'Unable to find forum');
  }

  if (body.parentId === forum.id) {
    ctx.throw(400, "You can't set the parentId of a forum to its own id.");
  }

  const updatedForum = await forum.update(body);

  if (updatedForum) {
    ctx.body = { updatedForum };
    ctx.status = 200;
  }
};

export const del = async ctx => {
  const {
    params: { id },
  } = ctx;

  const forum = await Forum.findByPk(id, {
    include: subForumsInclude,
  });

  if (!forum) {
    ctx.throw(404, 'Unable to find forum');
  }

  const archivedForum = await forum.update({ isArchived: true });

  forum.subForums.forEach(async subForum => {
    const forum = await Forum.findByPk(subForum.id);
    await forum.update({ parentId: null });
  });

  if (archivedForum) {
    ctx.body = { archivedForum };
    ctx.status = 200;
  }
};
