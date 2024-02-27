import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { ChatContext } from "./ChatContext";
import { Oval } from "react-loader-spinner";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function Profile() {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const { profile, setProfile } = useContext(ChatContext);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setApiStatus(apiConstants.inProgress);
        const apiurl = "http://localhost:5000/user-info";
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${Cookies.get("chatToken")}`,
          },
        };

        const response = await fetch(apiurl, options);
        if (response.ok) {
          const fetchedData = await response.json();
          const profile = fetchedData.message[0];
          setProfile(profile);
          setApiStatus(apiConstants.success);
        } else {
          setApiStatus(apiConstants.failure);
        }
      } catch (err) {
        console.log("Error while fetching user profile info:", err);
        setApiStatus(apiConstants.failure);
      }
    };
    getUserProfile();
  }, []);

  const renderLoader = () => {
    return (
      <Oval
        visible={true}
        height="100%"
        width="25"
        color="#fff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  };

  const renderFailureView = () => {
    return <div>failure view</div>;
  };

  const renderSuccessView = () => {
    return (
      <div>
        <p>{profile.name}</p>
        <img src={profile.imageUrl} style={{ height: "50px", width: "50px" }} />
      </div>
    );
  };

  const renderAppropriateView = () => {
    switch (apiStatus) {
      case apiConstants.success:
        return renderSuccessView();
      case apiConstants.inProgress:
        return renderLoader();
      default:
        return renderFailureView();
    }
  };

  return <div>{renderAppropriateView()}</div>;
}
