"use client";

export default function VisitorCards() {
  const cards = [
    { title: "Total Visitors", value: 120, color: "border-blue-500" },
    { title: "Checked In", value: 85, color: "border-green-500" },
    { title: "Checked Out", value: 70, color: "border-gray-500" },
    { title: "Pending Approval", value: 10, color: "border-yellow-500" },
  ];

  return (
    <>
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-white rounded-xl shadow-md p-6 flex flex-col justify-center items-center hover:shadow-lg transition border-b-4 ${card.color}`}
        >
          <div className="text-3xl font-bold text-gray-800">{card.value}</div>
          <div className="text-gray-500 mt-2">{card.title}</div>
        </div>
      ))}
    </>
  );
}
