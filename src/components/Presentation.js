import React from "react";
import { useHistory, useParams } from "react-router";
import useHeadlessAPI from "../api/useHeadlessAPI";

const Presentation = () => {
  const { path } = useParams();
  const { data } = useHeadlessAPI(getPresentation(`/${path}`));

  const history = useHistory();

  if (!data) return <p>Loading...</p>;

  function handleClick() {
    history.push("/");
  }

  const presentation = data.presentationByPath.item;
  const conf = data.conferenceByPath.item;

  return (
    <div>
      <header>
        <div>
          <h1>{conf.title}</h1>
          {conf.slogan}
        </div>
        <img src={conf.logo._publishUrl} alt="adaptTo() Logo" />
      </header>
      <h2>{presentation.title}</h2>
      {presentation.startTime.slice(0, 5)} - {presentation.endTime.slice(0, 5)}
      <h4>Outline</h4>
      <div
        dangerouslySetInnerHTML={{
          __html: presentation.outline.html,
        }}
      ></div>
      <h4>Speakers</h4>
      {presentation.speakers.map((speaker) => {
        return (
          <div key={speaker._path}>
            <div className="side-by-side">
              <img src={speaker.avatar._publishUrl} alt={speaker.name} />
              <span>
                {speaker.name}, {speaker.company}
              </span>
            </div>
            <p>{speaker.about.plaintext}</p>
          </div>
        );
      })}
      <button type="button" onClick={handleClick}>
        Back to schedule
      </button>
      <h5>{conf.footer.message}</h5>
    </div>
  );
};

function getPresentation(path) {
  return `
  {
  presentationByPath(_path: "${path}") {
    item {
      _path
      title
      startTime
      endTime
      outline {
        html
      }
      speakers {
        _path
        name
        company
        about {
          plaintext
        }
        avatar {
          ...on ImageRef {
            _path
            _publishUrl
          }
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
}
`;
}

export default Presentation;
