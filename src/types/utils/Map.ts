import { CSSProperties } from "react";

import { LatLng } from "../Maps";

export interface SetMapLocationProps extends LatLng {
  zoom?: number;
}

export interface MarkerLocationProps extends LatLng {
  title: string;
}

export interface SetWaypointRouteProps {
  from: LatLng;
  to: LatLng;
  addWaypoints?: boolean;
  draggableWaypoints?: boolean;
  showRoutes?: boolean;
  lineOptions?: {
    styles?: CSSProperties;
  };
}
