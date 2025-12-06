import { Link } from "react-router";
import {
  FiPackage,
  FiTrendingUp,
  FiUsers,
  FiBarChart,
  FiClock,
  FiTruck,
  FiShield,
} from "react-icons/fi";
import ExploreCard from "../components/ExploreCard";
import Carousel from "../components/Carousel";

const Landing = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-emerald-500 via-cyan-500 to-sky-500">
        <div className="absolute inset-0 bg-slate-900/40" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:py-24 lg:px-8">
          {/* Left: text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-emerald-100 ring-1 ring-emerald-400/60">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              <span>Designed for modern warehouse teams</span>
            </div>

            <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
              <FiPackage className="h-12 w-12 sm:h-16 sm:w-16 text-emerald-200 drop-shadow-lg" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow">
                WarehouseMS
              </h1>
            </div>

            <p className="mx-auto mb-8 max-w-xl text-sm sm:text-base md:text-lg text-emerald-50/90">
              Streamline inventory, automate order processing, and track staff
              performance in one unified, real-time warehouse management
              platform.
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-lg bg-amber-300 px-8 py-3 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-amber-400"
              >
                Get Started
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium text-emerald-50/90 underline-offset-4 hover:underline"
              >
                Create an account
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 text-xs text-emerald-50/80 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
                  24/7
                </span>
                <span>Cloud-based & always available</span>
              </div>
              <div className="h-px w-10 bg-emerald-200/40 sm:h-6 sm:w-px" />
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          {/* Right: fake dashboard preview */}
          <div className="flex-1">
            <div className="mx-auto max-w-md rounded-2xl bg-slate-900/80 p-5 shadow-2xl ring-1 ring-emerald-300/30 backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Live overview</p>
                  <p className="text-sm font-semibold text-slate-50">
                    Central Warehouse · Sofia
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                  Healthy
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl bg-slate-800/70 p-3">
                  <p className="text-slate-400">Stock accuracy</p>
                  <p className="mt-2 text-lg font-bold text-emerald-300">
                    99.4%
                  </p>
                  <p className="mt-1 text-[11px] text-emerald-400">
                    +1.2% this week
                  </p>
                </div>
                <div className="rounded-xl bg-slate-800/70 p-3">
                  <p className="text-slate-400">Orders today</p>
                  <p className="mt-2 text-lg font-bold text-sky-300">324</p>
                  <p className="mt-1 text-[11px] text-sky-400">87 in picking</p>
                </div>
                <div className="rounded-xl bg-slate-800/70 p-3">
                  <p className="text-slate-400">Avg. lead time</p>
                  <p className="mt-2 text-lg font-bold text-amber-300">1.8 d</p>
                  <p className="mt-1 text-[11px] text-amber-300/80">
                    −23% vs last month
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-slate-800/70 p-3 text-xs">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-slate-100">
                    Critical alerts
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Auto-resolved in real time
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-200">
                      Low stock – Section A3
                    </span>
                    <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-300">
                      Restocking
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-200">
                      Carrier delay – Dock 4
                    </span>
                    <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-sky-300">
                      Re-routed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-slate-800 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <div className="flex items-center gap-2 text-slate-300">
            <FiPackage className="h-4 w-4 text-emerald-400" />
            <span>Built for growing warehouses</span>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-slate-400">
            <span>
              <span className="font-semibold text-emerald-300">120+</span>{" "}
              active warehouses
            </span>
            <span>
              <span className="font-semibold text-emerald-300">30%</span> faster
              order processing
            </span>
            <span>
              <span className="font-semibold text-emerald-300">99.4%</span>{" "}
              stock accuracy
            </span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-50">
            Stay in control of your operations
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Real-time insight into inventory, orders, and performance – without
            spreadsheets or guesswork.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <FiTrendingUp className="h-6 w-6 text-emerald-400" />,
              title: "Real-time inventory",
              text: "See stock levels across locations instantly with lot, batch, and expiration tracking.",
            },
            {
              icon: <FiTruck className="h-6 w-6 text-sky-400" />,
              title: "Order automation",
              text: "Automate picking, packing and shipping workflows to reduce errors and delays.",
            },
            {
              icon: <FiUsers className="h-6 w-6 text-indigo-400" />,
              title: "Customer visibility",
              text: "Keep your customers in the loop with accurate ETAs and order history.",
            },
            {
              icon: <FiBarChart className="h-6 w-6 text-amber-300" />,
              title: "Actionable analytics",
              text: "Turn operations data into dashboards for planning and continuous improvement.",
            },
            {
              icon: <FiClock className="h-6 w-6 text-cyan-300" />,
              title: "Faster onboarding",
              text: "Get your team productive quickly with a clean UI and role-based access.",
            },
            {
              icon: <FiShield className="h-6 w-6 text-rose-300" />,
              title: "Secure by design",
              text: "Granular permissions, audit trails, and secure cloud infrastructure.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800/80">
                {card.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-50">
                {card.title}
              </h3>
              <p className="text-sm text-slate-300">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-slate-800 bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-50">
              How WarehouseMS fits into your day
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              From receiving to shipping, everything is connected.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Receive & label",
                text: "Capture incoming goods, apply barcodes, and assign optimized storage locations.",
              },
              {
                step: "02",
                title: "Pick & pack smarter",
                text: "Guide staff with prioritized pick lists, reduce travel time, and prevent stockouts.",
              },
              {
                step: "03",
                title: "Ship with confidence",
                text: "Confirm orders, print labels, and sync shipment status back to your systems.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-6"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-semibold text-emerald-300">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold text-slate-50">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-slate-50">
              Explore warehouse best practices
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Stay ahead of demand with strategies, guides, and tools used by
              modern warehouses.
            </p>
          </div>
          <Link
            to="/login"
            className="text-sm font-medium text-emerald-300 underline-offset-4 hover:underline"
          >
            Sign in to start configuring your warehouse
          </Link>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <ExploreCard
            img="https://content.cdn.sap.com/is/image/sap/282072:3840x2160?wid=685&hei=385&fit=stretch,1&resMode=sharp2"
            title="Explore WMS software"
            subtitle="Keep up with changing demand and lower costs with a modern, real-time management system."
          />

          <ExploreCard
            img="https://content.cdn.sap.com/is/image/sap/285010:3840x2160?wid=685&hei=385&fit=stretch,1&resMode=sharp2"
            title="What is warehouse automation?"
            subtitle="Learn how automation can remove bottlenecks and give your teams clean, up-to-date data."
          />

          <ExploreCard
            img="https://t4.ftcdn.net/jpg/01/81/65/85/360_F_181658575_6gz3Gx96iRndmBtXv2llVsGOGsfdT1AP.jpg"
            title="Improve warehouse efficiency"
            subtitle="Discover optimization techniques that reduce travel time, improve slotting, and boost staff productivity using real-world warehouse data."
          />
        </div>
      </section>

      {/* PARTNERS / CAROUSEL */}
      <section className="border-y border-slate-800 bg-slate-900/70">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Partners & Integrations
            </p>
            <p className="mt-1 text-sm text-slate-300">
              Connect WarehouseMS with your existing ERP, ecommerce, and
              logistics tools.
            </p>
          </div>
          <Carousel />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-linear-to-br from-emerald-600 via-emerald-500 to-cyan-500 p-8 sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.75),transparent_60%)]" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Ready to modernize your warehouse?
                </h2>
                <p className="mt-2 max-w-xl text-sm text-emerald-50/90">
                  Start with a simple setup, invite your team, and get real-time
                  visibility into your stock, orders, and performance – without
                  disrupting your current operations.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-8 py-3 text-sm font-semibold text-emerald-200 shadow-md transition hover:bg-slate-900"
                >
                  Start free
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-50 underline-offset-4 hover:underline"
                >
                  Already using WarehouseMS? Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-[13px]">
          <div className="flex items-center gap-2">
            <FiPackage className="h-4 w-4 text-emerald-400" />
            <span className="font-medium text-slate-300">WarehouseMS</span>
            <span className="text-slate-500">
              · Warehouse management rethought
            </span>
          </div>
          <div className="flex flex-wrap gap-4">
            <span>© {new Date().getFullYear()} WarehouseMS</span>
            <button className="underline-offset-4 hover:underline">
              Privacy
            </button>
            <button className="underline-offset-4 hover:underline">
              Terms
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Landing;
