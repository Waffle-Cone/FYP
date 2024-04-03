import DashCard from "../UI/DashCard";

function Home({ userType }) {
  // Initialisations ---------------------
  const bookingCardtext = () => {
    if (userType === 2) {
      return "MY SCHEDULE";
    } else {
      return "BOOKINGS";
    }
  };
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <div className="middle">
      <div className="dashContainer">
        {userType === 1 ? <DashCard name={"WATERCRAFT"} to={"/watercraft"} /> : null}
        {userType === 1 ? <DashCard name={"STAFF"} to={"/staff"} /> : null}
        <DashCard name={bookingCardtext()} to={"/bookings"} />
      </div>
    </div>
  );
}

export default Home;
