import Dexie from 'dexie';

export const appDB = new Dexie('wallpaperDatabase');

/**
 * wallpapers 保存的字段
 * id, createTime, imageBlob, originalPath, resolution, dimension_x, dimension_y, ratio
 * wallpapers 中 index 的字段，不过多数只需要createTime来排序检索
 * id createTime, dimension_x, dimension_y ,ratio
 *
 * settting 中用来保存设置， name
 */

appDB.version(1).stores({
  wallpapers: 'id, createTime, dimension_x, dimension_y, ratio',
  settings: 'key',
});
