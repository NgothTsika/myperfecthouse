"use client";

import useSearchModel from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../Imputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../Imputs/Calendar";
import Counter from "../Imputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModel();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.enDate = formatISO(dateRange.endDate);
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLable = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
  }, [step]);

  let bodyCountent = (
    <div className=" flex flex-col gap-8">
      <Heading
        title="Where do you what to go"
        subtitle="Find the perfect location"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latLng} />
    </div>
  );
  if (step === STEPS.DATE) {
    bodyCountent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sur everyone is free!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    <div className=" flex flex-col gap-8">
      <Heading title="More information" subtitle=" Find your perfect place" />
      <Counter
        title="Guests"
        subtitle="How many guest are coming?"
        value={guestCount}
        onChange={(value) => setGuestCount(value)}
      />
      <Counter
        title="Rooms"
        subtitle="How many rooms are do you need?"
        value={roomCount}
        onChange={(value) => setRoomCount(value)}
      />
      <Counter
        title="Bathrooms"
        subtitle="How many bathrooms do you need?"
        value={bathroomCount}
        onChange={(value) => setBathroomCount(value)}
      />
    </div>;
  }

  return (
    <div>
      <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="Filters"
        actionLable={actionLable}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        body={bodyCountent}
      />
    </div>
  );
};

export default SearchModal;
