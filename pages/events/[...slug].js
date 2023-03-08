import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import { Fragment, useEffect, useState } from 'react';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import useSWR from 'swr';

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const fireBaseUrl = 'https://event-list-6aeb4-default-rtdb.firebaseio.com/events.json'

  /* NOTES : Extracting Data encoded in the URL using useRouter Next Hook 
    Get the data using useRouter to query the "slug" data, and store its value. 
    If the Data is not loaded, if his value is Falsy (undefined), in case of the first built in page
  */

  const filterData = router.query.slug;


  const fetcher = (url) => fetch(url).then((res) => res.json());


  const { data, error } = useSWR(
    fireBaseUrl, fetcher

  );

  console.log(data, error);

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     }
//   };

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   })

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       }
//     }
//   }
// }

export default FilteredEventsPage;
