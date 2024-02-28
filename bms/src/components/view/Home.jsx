import DashCard from "../UI/DashCard";

function Home() {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <div className="middle">
      <div className="dashContainer">
        <DashCard name={"WATERCRAFT"} to={"/watercraft"} />
        <DashCard name={"STAFF"} to={"/staff"} />
        <DashCard name={"BOOKINGS"} to={"/bookings"} />
      </div>
    </div>
  );
}

export default Home;
