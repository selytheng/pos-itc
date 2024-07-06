import {
  AreaCards,
  AreaBarCharts,
  AreaTop,
  AreaProgressCharts,
} from "../../components";
import "./DashboardScreen.scss";

const Dashboard = () => {
  return (
    <div className="content-area">
      <AreaTop />
      <div className="dashboard-container">
        <div className="left-side-container">
          <AreaCards />
          <AreaBarCharts />
        </div>
        <div className="right-side-cotainer">
          <AreaProgressCharts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
