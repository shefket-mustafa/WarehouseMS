import { Link } from "react-router";
import { FiPackage, FiTrendingUp, FiUsers, FiBarChart } from "react-icons/fi";
import ExploreCard from "../components/ExploreCard";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-emerald-500 via-cyan-500 to-sky-500 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center gap-3"> 
              <FiPackage className="h-16 w-16 drop-shadow-lg" />
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow">
                WarehouseMS
              </h1>
            </div>

            <p className="mx-auto mb-8 max-w-2xl text-base sm:text-lg text-white/90">
              A warehouse management system to streamline inventory, manage orders,
              and give you real-time insight into your operations.
            </p>

            <Link
              to="/login"
              className="inline-block rounded-lg bg-amber-300 px-8 py-3 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-amber-400"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-100">
          Key Features
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/20">
              <FiTrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-50">
              Real-time Inventory
            </h3>
            <p className="text-sm text-slate-300">
              Track stock levels in real time with detailed product information,
              low-stock alerts, and clear visibility across your warehouse.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/20">
              <FiUsers className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-50">
              Customer Management
            </h3>
            <p className="text-sm text-slate-300">
              Keep a clean customer database with order history, contact info, and
              tools to maintain strong relationships.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/20">
              <FiBarChart className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-50">
              Analytics & Reports
            </h3>
            <p className="text-sm text-slate-300">
              Generate reports and dashboards so you can make decisions based on
              real data, not guesswork.
            </p>
          </div>
          {/* Card 3 ending */}

          {/* Card 4 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/20">
              <FiBarChart className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-50">
              Order Processing Automation
            </h3>
            <p className="text-sm text-slate-300">
             Streamline order fulfillment with automated picking, packing, and shipping workflows to reduce errors and speed up delivery times.
            </p>
          </div>

          {/* Card 5 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/20">
              <FiBarChart className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-50">
              Warehouse Optimization
            </h3>
            <p className="text-sm text-slate-300">
              Maximize storage efficiency with intelligent slotting, layout planning, and tools that adapt to changes in demand and inventory flow.
            </p>
          </div>

          {/* Card 6 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/20">
              <FiBarChart className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-50">
              Staff Performance Tracking
            </h3>
            <p className="text-sm text-slate-300">
            Monitor productivity, assign tasks efficiently, and gain insights into workforce performance to keep your warehouse running smoothly.
            </p>
          </div>
        </div>

        
      </section>
      {/* Features ending */}

      {/* Explore WMS Software */}
      <section className="py-10 ">
    {/* <h1 className="text-center text-2xl py-10">Explore</h1> */}
    
  
    <div className="flex justify-around py-10">

      <ExploreCard 
      img="https://content.cdn.sap.com/is/image/sap/282072:3840x2160?wid=685&hei=385&fit=stretch,1&resMode=sharp2"
      title="Explore WMS software"
      subtitle="Keep up with changing demand, lower cost with SAP Extended Warehouse Management."
      />

       <ExploreCard 
      img="https://content.cdn.sap.com/is/image/sap/285010:3840x2160?wid=685&hei=385&fit=stretch,1&resMode=sharp2"
      title="What is warehouse automation?"
      subtitle="Learn how warehouse automation can help take the guesswork and bottlenecks out of warehouse management by empowering your teams with data, insights, and streamlined processes. "
      />

      
    </div>

      </section>


    </div>
  );
};

export default Landing;
