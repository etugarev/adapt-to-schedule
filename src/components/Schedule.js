import React, { useState } from "react";
import { Link } from "react-router-dom";
import useHeadlessAPI from "../api/useHeadlessAPI";

const Schedule = () => {
  const [query, setQuery] = useState(getSchedule("1"));

  const { data } = useHeadlessAPI(query);

  if (!data) return <p>Loading...</p>;

  const conf = data.conferenceByPath.item;
  const { presentations } = data.scheduleByPath.item;

  return (
    <div>
      <header>
        <div>
          <h1>{conf.title}</h1>
          {conf.slogan}
        </div>
        <img src={conf.logo._publishUrl} alt="adaptTo() Logo" />
      </header>

      <h2>Schedule</h2>
      <button onClick={() => setQuery(getSchedule("1"))}>Day 1</button>
      <button onClick={() => setQuery(getSchedule("2"))}>Day 2</button>
      <button onClick={() => setQuery(getSchedule("3"))}>Day 3</button>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Topic</th>
            <th>Speaker</th>
          </tr>
        </thead>
        <tbody>
          {
            //Iterate over the returned data items from the query
            presentations.map((item) => {
              return <ScheduleItem key={item._path} {...item} />;
            })
          }
        </tbody>
      </table>
      <h5>{conf.footer.message}</h5>
    </div>
  );
};

// Render individual ScheduleItem
function ScheduleItem(props) {
  if (!props) {
    return null;
  }

  return (
    <tr>
      <td>
        {props.startTime.slice(0, 5)} - {props.endTime.slice(0, 5)}
      </td>
      <td>
        <Link to={`/presentation${props._path}`}>{props.title}</Link>
      </td>
      <td>
        {props.speakers.map((speaker) => {
          return <div key={speaker._path}>{speaker.name}</div>;
        })}
      </td>
    </tr>
  );
}

function getSchedule(day) {
  return `
 {
  scheduleByPath(_path: "/content/dam/adaptto/schedule/day-${day}") {
    item {
      _path
      presentations {
        _path
        title
        startTime
        endTime
        speakers {
          _path
          name
        }
      }
    }
  }
  conferenceByPath(_path: "/content/dam/adaptto/adapt-to-2021") {
    item {
      _path
      _variation
      title
      slogan
      logo {
        ... on DocumentRef {
          _publishUrl
          _path
        }
      }
      footer
    }
  }
}`;
}

export default Schedule;
