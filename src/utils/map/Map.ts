import { MutableRefObject } from "react";

import {
  MarkerLocationProps,
  SetMapLocationProps,
  SetWaypointRouteProps,
} from "../../types";

export function setMapLocationMarkers(
  ref: MutableRefObject<any>,
  markers: MarkerLocationProps[]
) {
  if (markers.length > 0) {
    for (let i = 0; i < markers.length; i++) {
      const { latitude, longitude } = markers[i];
      ref.current.injectJavaScript(`
        L.marker([${latitude}, ${longitude}]).addTo(mapConstant);
`);
    }
  }
}

export function setCurrentMapLocationAndMarker(
  ref: MutableRefObject<any>,
  { latitude, longitude, zoom = 15 }: SetMapLocationProps
) {
  ref.current.injectJavaScript(`
    mapConstant.setView([${latitude}, ${longitude}], ${zoom});
    L.marker([${latitude}, ${longitude}]).addTo(mapConstant);
    `);
}

export function setMapLocationView(
  ref: MutableRefObject<any>,
  { latitude, longitude, zoom }: SetMapLocationProps
) {
  ref.current.injectJavaScript(`
    mapConstant.setView([${latitude}, ${longitude}], ${zoom})
    `);
}

export function setWaypointRoute(
  ref: MutableRefObject<any>,
  {
    from,
    to,
    addWaypoints = false,
    draggableWaypoints = false,
    lineOptions = {},
    showRoutes = false,
  }: SetWaypointRouteProps
) {
  ref.current.injectJavaScript(`
    L.Routing.control({
  waypoints: [
    L.latLng(${from.latitude},${from.longitude}),
    L.latLng(${to.latitude},${to.longitude})
  ],
  show: ${showRoutes},
  addWaypoints: ${addWaypoints},
  draggableWaypoints: ${draggableWaypoints},
  lineOptions: {
    styles: [{color: "#6495ED"}]
  }

}).addTo(mapConstant);
`);
}
