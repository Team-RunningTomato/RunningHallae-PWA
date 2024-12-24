export interface MeetBoardDetailType {
  title: string;
  distance: string;
  startAt: string; // yyyy-MM-ddTHH:mm
  startLocation: {
    startLongitude: number;
    startLatitude: number;
  };
  author: {
    name: string;
    level: string;
  };
  addressDetail: string;
  memberNum: string;
}

export interface AddressDetailType {
  address_name: string;
}

export interface TokenInfoType {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

export interface MyInfoType {
  id: string;
  name: string;
  weight: string | null;
  height: string | null;
  runningUser: {
    totalDistance: number;
    bestDistance: number;
    worstDistance: number;
    levelPercentage: number;
  };
}
