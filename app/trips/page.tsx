import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getReservation from "../actions/getReservation";
import TripsClient from "./TripsClient";
import getCurrentUsers from "../actions/getCurrentUser";

const TripsPage = async () => {
  const currentUser = await getCurrentUsers();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservation({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trip found"
          subtitle="Looks like you havent reserved any trips."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
