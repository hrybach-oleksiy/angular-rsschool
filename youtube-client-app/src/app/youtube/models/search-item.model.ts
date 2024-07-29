export enum ItemStats {
  VIEW_COUNT = 'viewCount',
  LIKE_COUNT = 'likeCount',
  DISLIKE_COUNT = 'dislikeCount',
  COMMENT_COUNT = 'commentCount',
}

export enum ItemIcon {
  VISIBILITY = 'visibility',
  THUMB_UP = 'thumb_up',
  THUMB_DOWN = 'thumb_down',
  COMMENT = 'comment',
}

export enum ItemLabel {
  VIEWS = 'Views',
  LIKES = 'Likes',
  DISLIKES = 'Dislikes',
  COMMENTS = 'Comments',
}

export const itemsStats = [
  {
    icon: ItemIcon.VISIBILITY,
    property: ItemStats.VIEW_COUNT,
    label: ItemLabel.VIEWS,
  },
  {
    icon: ItemIcon.THUMB_UP,
    property: ItemStats.LIKE_COUNT,
    label: ItemLabel.LIKES,
  },
  {
    icon: ItemIcon.THUMB_DOWN,
    property: ItemStats.DISLIKE_COUNT,
    label: ItemLabel.DISLIKES,
  },
  {
    icon: ItemIcon.COMMENT,
    property: ItemStats.COMMENT_COUNT,
    label: ItemLabel.COMMENTS,
  },
] as const;
