import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

function PieChartComponent({ pieChartData = [] }) {
  return (
    <div className="w-full h-96 flex justify-center items-center">
      {pieChartData.some((item) => item.value > 0) ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieChartData.filter((item) => item.value > 0)}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              innerRadius={80}
              fill="#8884d8"
              dataKey="value"
              stroke="#fff"
              strokeWidth={2}
            >
              {pieChartData
                .filter((item) => item.value > 0)
                .map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [value, name]}
              labelFormatter={() => ""}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry) => `${value}: ${entry.payload.value}`}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-gray-500 text-center">
          <p className="text-lg">No tasks available</p>
          <p className="text-sm">Add some tasks to see the chart</p>
        </div>
      )}
    </div>
  );
}

export default PieChartComponent;
