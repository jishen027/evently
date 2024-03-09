import { SearchParamProps } from "@/types";
import React from "react";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import Collection from "@/components/shared/Collection";
import CheckoutButton from "@/components/shared/CheckoutButton";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt={event.title}
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold rounded-full bg-green-500/10 px-5 py-2.5 text-green-700">
                    {event.isFree ? "Free" : `$${event.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                  <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                    by{" "}
                    <span className="text-primary-500">
                      {event.organizer.firstName}
                      {event.organizer.lastName}
                    </span>
                  </p>
                </div>
              </div>

              
              {/* CHECKOUT */}
              <CheckoutButton event={event} />


              <div className="flex flex-col gap-5">
                <div className="flex gap-2 md:gap-3">
                  <Image
                    src="/assets/icons/calendar.svg"
                    width={32}
                    height={32}
                    alt="calendar"
                  />
                  <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                    <p className="ml-1">
                      {formatDateTime(event.startDateTime).dateOnly} /{" "}
                      {formatDateTime(event.startDateTime).timeOnly} -{" "}
                    </p>
                    <p className="ml-1">
                      {formatDateTime(event.endDateTime).dateOnly} /{" "}
                      {formatDateTime(event.endDateTime).timeOnly}
                    </p>
                  </div>
                </div>

                <div className="p-regular-20 flex items-center gap-3">
                  <Image
                    src="/assets/icons/location.svg"
                    width={32}
                    height={32}
                    alt="location"
                  />
                  <p>{event.location}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="p-bold-20 text-grey-500">
                  What to expect at the event:
                </p>
                <p className="p-medium-16 lg:p-regular-18">
                  {event.description}
                </p>
                <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                  {event.url}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event from same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2>Related Event</h2>
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No related events found"
          emptyStateSubtext="Check back later for more events"
          collectionType="Events_Organized"
          limit={6}
          page={1}
          totalPages={1}
        />
      </section>
    </>
  );
};

export default EventDetails;
