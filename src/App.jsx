import { Fragment, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import en from "date-fns/locale/en-US";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfToday,
  isToday,
  isSameMonth,
  isEqual,
  parse,
  add,
  getDay,
  startOfWeek,
  parseISO,
  isSameDay,
} from "date-fns";

const meetings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    // startDatetime: "2022-01-21T13:00",
    // endDatetime: "2022-01-21T14:30",
    startDatetime: `${new Date().toISOString()}`,
    endDatetime: `${add(new Date(), { hours: 1 }).toISOString()}`,
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: `${add(new Date(), { minutes: 90 }).toISOString()}`,
    endDatetime: `${add(new Date(), { minutes: 150 }).toISOString()}`,
  },
  {
    id: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: `${add(new Date(), { hours: 3 }).toISOString()}`,
    endDatetime: `${add(new Date(), { hours: 4 }).toISOString()}`,
  },
  {
    id: 4,
    name: "Lindsay Walton",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: `${add(new Date(), { days: 1 }).toISOString()}`,
    endDatetime: `${add(new Date(), { days: 1, hours: 1 }).toISOString()}`,
  },
  {
    id: 5,
    name: "Courtney Henry",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: `${add(new Date(), { days: 3 }).toISOString()}`,
    endDatetime: `${add(new Date(), { weeks: 1, hours: 1 }).toISOString()}`,
  },
];

// make composable
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar() {
  let today = startOfToday();

  // all dates for this week into array starting with Sunday of this week (full dates)
  const thisWeeksDates = eachDayOfInterval({
    start: startOfWeek(today, { weekStartsOn: 0 }),
    end: endOfWeek(today, { weekStartsOn: 0 }),
  });

  let weekdays = [];

  // push thisWeeksDates into array (formatted S,M,T...)
  thisWeeksDates.map((a) => weekdays.push(format(a, "EEEEE", { locale: en })));

  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  );

  function setToday() {
    setCurrentMonth(format(selectedDay, "MMM-yyyy"));
    setSelectedDay(today);
  }

  const [darkToggle, setDarkToggle] = useState(false);

  return (
    <main className={`${darkToggle && "dark"}`}>
      <div className="min-h-screen bg-gradient-to-tr from-sky-200 to-indigo-500 dark:from-slate-700 dark:to-slate-900 p-2 sm:p-6 md:p-12 relative">
        <button
          type="button"
          onClick={() => setDarkToggle(!darkToggle)}
          className="transition duration-200 inline-flex items-center rounded-full border border-transparent dark:bg-slate-900 bg-gray-50 p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 absolute top-3  right-3"
        >
          {darkToggle ? (
            <MoonIcon className="h-5 w-5 text-slate-200" strokeWidth={2} />
          ) : (
            <SunIcon className="h-5 w-5 text-indigo-700" strokeWidth={2} />
          )}
        </button>
        <div className="bg-gray-50 p-10 rounded shadow flex flex-col space-y-16 max-w-6xl mx-auto dark:bg-slate-900 transition">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-300">
            Upcoming Meetings
          </h2>

          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200 dark:md:divide-gray-700">
            <div className="md:pr-14">
              <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900 dark:text-slate-300">
                  {format(firstDayCurrentMonth, "MMMM yyyy")}
                </h2>

                <button
                  onClick={previousMonth}
                  type="button"
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 transition hover:text-gray-500"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={setToday}
                  className="-my-1.5 flex text-sm flex-none items-center justify-center p-1.5 text-gray-400  transition hover:text-gray-500 mx-0.5"
                >
                  Today
                  <span className="sr-only">See Today</span>
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 transition text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500 dark:text-gray-400">
                {/* ["S", "M", "T", "W", "T", "F", "S"] */}
                {weekdays.map((day, idx) => {
                  return <div key={idx}>{day}</div>;
                })}
              </div>
              <div className="mt-2 grid grid-cols-7 text-sm">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      "py-1.5"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={classNames(
                        isEqual(day, selectedDay) && "text-white",
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "text-red-500 dark:text-red-500",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-900 dark:text-gray-300",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-400 dark:text-gray-600",
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "bg-red-500 dark:bg-red-600",
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          "bg-gray-900",
                        !isEqual(day, selectedDay) &&
                          "hover:bg-gray-200 dark:hover:bg-gray-700",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          "font-semibold",
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </button>
                    <div className="w-1 h-1 mx-auto mt-2">
                      {meetings.some((meeting) =>
                        isSameDay(parseISO(meeting.startDatetime), day)
                      ) && (
                        <div className="w-1 h-1 rounded-full bg-sky-600 dark:bg-sky-500"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <section className="mt-12 md:mt-0 md:pl-14">
              <h2 className="font-semibold text-gray-900 dark:text-gray-400">
                Schedule for{" "}
                <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                  {format(selectedDay, "MMM dd, yyyy")}
                </time>
              </h2>
              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {selectedDayMeetings.length > 0 ? (
                  selectedDayMeetings.map((meeting) => (
                    <Meeting meeting={meeting} key={meeting.id} />
                  ))
                ) : (
                  <p>No Meetings for Today</p>
                )}
              </ol>
            </section>
          </div>
          <p>
            An interactive calendar built with React, TailwindCSS, Heroicons,
            and Date-FNS
          </p>

          <ul>
            <li>move dark toggle inside card</li>
            <li>add back to website arrow</li>
            <li>add husky and pro software engineering best practices</li>
            <li>break into components and composables</li>
            <li>work on dark styles</li>
            <li>replace gray with slate</li>
            <li>is headless ui needed?</li>
            <li>deploy to vercel</li>
            <li>add github repo button next to dark toggle</li>
            <li>update readme to include working demo, gif, etc</li>
            <li>
              add toggles for meetings dot indicator, display dates from other
              months, etc.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

function Meeting({ meeting }) {
  let startDateTime = parseISO(meeting.startDatetime);
  let endDateTime = parseISO(meeting.endDatetime);
  return (
    <li className="group flex items-center space-x-4 rounded-xl py-2 px-4 focus-within:bg-gray-100 transition hover:bg-gray-100 dark:hover:bg-gray-800">
      <img
        src={meeting.imageUrl}
        alt=""
        className="h-10 w-10 flex-none rounded-full"
      />
      <div className="flex-auto">
        <p className="text-gray-900 dark:text-gray-400">{meeting.name}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.startDatetime}>
            {format(startDateTime, "h:mm a")}
          </time>{" "}
          -{" "}
          <time dateTime={meeting.endDatetime}>
            {format(endDateTime, "h:mm a")}
          </time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
}
