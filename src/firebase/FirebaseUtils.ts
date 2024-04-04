import {
  doc,
  DocumentSnapshot,
  FirestoreError,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { OfficeService } from "../types";

interface FirebaseUtils<T> {
  onError: (error: FirestoreError) => void;
  onSubscribe: (data: DocumentSnapshot<T>) => void;
}

interface GetQueueRealtimeUpdates<T> extends FirebaseUtils<T> {
  branchId: number;
  officeService: OfficeService;
}

export function getQueueRealtimeUpdates<T>({
  onError,
  branchId,
  onSubscribe,
  officeService,
}: GetQueueRealtimeUpdates<T>) {
  return onSnapshot(
    doc(db, branchId.toString(), officeService),
    (doc) => {
      console.log("subcsriber running");
      onSubscribe(doc as DocumentSnapshot<T>);
    },
    onError
  );
}
