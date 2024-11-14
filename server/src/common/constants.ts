export const COMMANDS = {
  START: 'start',
  HELP: 'help',
  BIKECHECK: 'bikecheck',
  CHECKBIKE: 'checkbike',
  DELETED: 'deleted',
  SET_STRAVA: 'setstrava',
  ON_SALE: 'onsale',
  TOP: 'top',
  MY_LIKES: 'mylikes',
  GET_ADMIN_PASSCODE: 'getadminpasscode',
};

export const CALLBACK_QUERY_COMMANDS = {
  LIKE: '1',
  DISLIKE: '2',
  SHOW_PREVIOUS_BIKECHECK: '3',
  SHOW_NEXT_BIKECHECK: '4',
  SHOW_PREVIOUS_DELETED_BIKECHECK: '5',
  SHOW_NEXT_DELETED_BIKECHECK: '6',
  SHOW_PREVIOUS_ON_SALE_BIKECHECK: '16',
  SHOW_NEXT_ON_SALE_BIKECHECK: '17',
  SHOW_PREVIOUS_LIKED_BIKECHECK: '19',
  SHOW_NEXT_LIKED_BIKECHECK: '18',
  DELETE_BIKECHECK: '7',
  RESTORE_BIKECHECK: '8',
  BAN_BIKECHECK: '9',
  SHOW_TOP_BIKECHECK: '10',
  SHOW_TOP_SELLING_BIKECHECK: '11',
  TOGGLE_ON_SALE: '12',
  SHOW_ON_SALE_BIKECHECK: '13',
  BUMP_ON_SALE_BIKECHECK: '14',
  SAGE_ON_SALE_BIKECHECK: '15',
  DELETE_STRAVA: '20',
};
