// Set the dimensions and margins of the graph
var margin = { top: 50, right: 30, bottom: 100, left: 60 },
    width = 1300 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
var svg = d3.select("#visualization")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add a tooltip div. It will be hidden by default.
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var fullData = [
    { country: "Finland", region: "Europe", happiness_score: 7.769, happiness_rank: 1, gdp_per_capita: 1.34, life_expectancy: 80.7, year: 2019 },
    { country: "Finland", region: "Europe", happiness_score: 7.632, happiness_rank: 1, gdp_per_capita: 1.34, life_expectancy: 80.6, year: 2018 },
    { country: "Finland", region: "Europe", happiness_score: 7.469, happiness_rank: 1, gdp_per_capita: 1.32, life_expectancy: 80.5, year: 2017 },
    { country: "Finland", region: "Europe", happiness_score: 7.413, happiness_rank: 5, gdp_per_capita: 1.31, life_expectancy: 80.3, year: 2016 },
    { country: "Finland", region: "Europe", happiness_score: 7.406, happiness_rank: 6, gdp_per_capita: 1.30, life_expectancy: 80.2, year: 2015 },
    { country: "Denmark", region: "Europe", happiness_score: 7.6, happiness_rank: 2, gdp_per_capita: 1.38, life_expectancy: 80.6, year: 2019 },
    { country: "Denmark", region: "Europe", happiness_score: 7.555, happiness_rank: 3, gdp_per_capita: 1.37, life_expectancy: 80.5, year: 2018 },
    { country: "Denmark", region: "Europe", happiness_score: 7.522, happiness_rank: 2, gdp_per_capita: 1.35, life_expectancy: 80.4, year: 2017 },
    { country: "Denmark", region: "Europe", happiness_score: 7.526, happiness_rank: 1, gdp_per_capita: 1.34, life_expectancy: 80.3, year: 2016 },
    { country: "Denmark", region: "Europe", happiness_score: 7.527, happiness_rank: 3, gdp_per_capita: 1.33, life_expectancy: 80.2, year: 2015 },
    { country: "Norway", region: "Europe", happiness_score: 7.554, happiness_rank: 3, gdp_per_capita: 1.45, life_expectancy: 82.0, year: 2019 },
    { country: "Norway", region: "Europe", happiness_score: 7.594, happiness_rank: 2, gdp_per_capita: 1.44, life_expectancy: 81.9, year: 2018 },
    { country: "Norway", region: "Europe", happiness_score: 7.537, happiness_rank: 1, gdp_per_capita: 1.44, life_expectancy: 81.8, year: 2017 },
    { country: "Norway", region: "Europe", happiness_score: 7.498, happiness_rank: 4, gdp_per_capita: 1.43, life_expectancy: 81.7, year: 2016 },
    { country: "Norway", region: "Europe", happiness_score: 7.522, happiness_rank: 4, gdp_per_capita: 1.42, life_expectancy: 81.6, year: 2015 },
    { country: "Iceland", region: "Europe", happiness_score: 7.494, happiness_rank: 4, gdp_per_capita: 1.38, life_expectancy: 82.7, year: 2019 },
    { country: "Iceland", region: "Europe", happiness_score: 7.495, happiness_rank: 4, gdp_per_capita: 1.38, life_expectancy: 82.6, year: 2018 },
    { country: "Iceland", region: "Europe", happiness_score: 7.504, happiness_rank: 3, gdp_per_capita: 1.38, life_expectancy: 82.5, year: 2017 },
    { country: "Iceland", region: "Europe", happiness_score: 7.501, happiness_rank: 3, gdp_per_capita: 1.37, life_expectancy: 82.4, year: 2016 },
    { country: "Iceland", region: "Europe", happiness_score: 7.561, happiness_rank: 2, gdp_per_capita: 1.37, life_expectancy: 82.3, year: 2015 },
    { country: "Netherlands", region: "Europe", happiness_score: 7.488, happiness_rank: 5, gdp_per_capita: 1.42, life_expectancy: 81.5, year: 2019 },
    { country: "Netherlands", region: "Europe", happiness_score: 7.441, happiness_rank: 6, gdp_per_capita: 1.41, life_expectancy: 81.4, year: 2018 },
    { country: "Netherlands", region: "Europe", happiness_score: 7.377, happiness_rank: 6, gdp_per_capita: 1.41, life_expectancy: 81.3, year: 2017 },
    { country: "Netherlands", region: "Europe", happiness_score: 7.339, happiness_rank: 7, gdp_per_capita: 1.40, life_expectancy: 81.2, year: 2016 },
    { country: "Netherlands", region: "Europe", happiness_score: 7.378, happiness_rank: 7, gdp_per_capita: 1.39, life_expectancy: 81.1, year: 2015 },
    { country: "Switzerland", region: "Europe", happiness_score: 7.48, happiness_rank: 6, gdp_per_capita: 1.45, life_expectancy: 82.6, year: 2019 },
    { country: "Switzerland", region: "Europe", happiness_score: 7.487, happiness_rank: 5, gdp_per_capita: 1.45, life_expectancy: 82.5, year: 2018 },
    { country: "Switzerland", region: "Europe", happiness_score: 7.494, happiness_rank: 4, gdp_per_capita: 1.44, life_expectancy: 82.4, year: 2017 },
    { country: "Switzerland", region: "Europe", happiness_score: 7.509, happiness_rank: 2, gdp_per_capita: 1.43, life_expectancy: 82.3, year: 2016 },
    { country: "Switzerland", region: "Europe", happiness_score: 7.587, happiness_rank: 1, gdp_per_capita: 1.43, life_expectancy: 82.2, year: 2015 },
    { country: "Sweden", region: "Europe", happiness_score: 7.343, happiness_rank: 7, gdp_per_capita: 1.38, life_expectancy: 82.0, year: 2019 },
    { country: "Sweden", region: "Europe", happiness_score: 7.314, happiness_rank: 9, gdp_per_capita: 1.38, life_expectancy: 81.9, year: 2018 },
    { country: "Sweden", region: "Europe", happiness_score: 7.284, happiness_rank: 10, gdp_per_capita: 1.37, life_expectancy: 81.8, year: 2017 },
    { country: "Sweden", region: "Europe", happiness_score: 7.291, happiness_rank: 10, gdp_per_capita: 1.36, life_expectancy: 81.7, year: 2016 },
    { country: "Sweden", region: "Europe", happiness_score: 7.364, happiness_rank: 8, gdp_per_capita: 1.36, life_expectancy: 81.6, year: 2015 },
    { country: "New Zealand", region: "Oceania", happiness_score: 7.307, happiness_rank: 8, gdp_per_capita: 1.33, life_expectancy: 81.0, year: 2019 },
    { country: "New Zealand", region: "Oceania", happiness_score: 7.324, happiness_rank: 8, gdp_per_capita: 1.32, life_expectancy: 80.9, year: 2018 },
	{ country: "New Zealand", region: "Oceania", happiness_score: 7.314, happiness_rank: 8, gdp_per_capita: 1.31, life_expectancy: 80.8, year: 2017 },
    { country: "New Zealand", region: "Oceania", happiness_score: 7.334, happiness_rank: 8, gdp_per_capita: 1.30, life_expectancy: 80.7, year: 2016 },
    { country: "New Zealand", region: "Oceania", happiness_score: 7.286, happiness_rank: 9, gdp_per_capita: 1.30, life_expectancy: 80.6, year: 2015 },
    { country: "Canada", region: "North America", happiness_score: 7.278, happiness_rank: 9, gdp_per_capita: 1.33, life_expectancy: 81.0, year: 2019 },
    { country: "Canada", region: "North America", happiness_score: 7.328, happiness_rank: 7, gdp_per_capita: 1.32, life_expectancy: 80.9, year: 2018 },
    { country: "Canada", region: "North America", happiness_score: 7.316, happiness_rank: 7, gdp_per_capita: 1.32, life_expectancy: 80.8, year: 2017 },
    { country: "Canada", region: "North America", happiness_score: 7.404, happiness_rank: 6, gdp_per_capita: 1.32, life_expectancy: 80.7, year: 2016 },
    { country: "Canada", region: "North America", happiness_score: 7.427, happiness_rank: 5, gdp_per_capita: 1.31, life_expectancy: 80.6, year: 2015 },
    { country: "Austria", region: "Europe", happiness_score: 7.246, happiness_rank: 10, gdp_per_capita: 1.34, life_expectancy: 81.3, year: 2019 },
    { country: "Austria", region: "Europe", happiness_score: 7.139, happiness_rank: 12, gdp_per_capita: 1.34, life_expectancy: 81.2, year: 2018 },
    { country: "Austria", region: "Europe", happiness_score: 7.006, happiness_rank: 12, gdp_per_capita: 1.34, life_expectancy: 81.1, year: 2017 },
    { country: "Austria", region: "Europe", happiness_score: 6.937, happiness_rank: 12, gdp_per_capita: 1.33, life_expectancy: 81.0, year: 2016 },
    { country: "Austria", region: "Europe", happiness_score: 6.891, happiness_rank: 13, gdp_per_capita: 1.33, life_expectancy: 80.9, year: 2015 },
    { country: "Australia", region: "Oceania", happiness_score: 7.228, happiness_rank: 11, gdp_per_capita: 1.34, life_expectancy: 82.5, year: 2019 },
    { country: "Australia", region: "Oceania", happiness_score: 7.272, happiness_rank: 10, gdp_per_capita: 1.34, life_expectancy: 82.4, year: 2018 },
    { country: "Australia", region: "Oceania", happiness_score: 7.284, happiness_rank: 9, gdp_per_capita: 1.34, life_expectancy: 82.3, year: 2017 },
    { country: "Australia", region: "Oceania", happiness_score: 7.313, happiness_rank: 9, gdp_per_capita: 1.34, life_expectancy: 82.2, year: 2016 },
    { country: "Australia", region: "Oceania", happiness_score: 7.284, happiness_rank: 10, gdp_per_capita: 1.33, life_expectancy: 82.1, year: 2015 },
    { country: "United States", region: "North America", happiness_score: 6.892, happiness_rank: 19, gdp_per_capita: 1.42, life_expectancy: 79.0, year: 2019 },
    { country: "United States", region: "North America", happiness_score: 6.886, happiness_rank: 18, gdp_per_capita: 1.42, life_expectancy: 78.9, year: 2018 },
    { country: "United States", region: "North America", happiness_score: 6.993, happiness_rank: 14, gdp_per_capita: 1.41, life_expectancy: 78.8, year: 2017 },
    { country: "United States", region: "North America", happiness_score: 7.104, happiness_rank: 13, gdp_per_capita: 1.41, life_expectancy: 78.7, year: 2016 },
    { country: "United States", region: "North America", happiness_score: 7.119, happiness_rank: 15, gdp_per_capita: 1.40, life_expectancy: 78.6, year: 2015 },
    { country: "United Kingdom", region: "Europe", happiness_score: 7.054, happiness_rank: 15, gdp_per_capita: 1.33, life_expectancy: 80.8, year: 2019 },
    { country: "United Kingdom", region: "Europe", happiness_score: 7.190, happiness_rank: 19, gdp_per_capita: 1.32, life_expectancy: 80.7, year: 2018 },
    { country: "United Kingdom", region: "Europe", happiness_score: 6.714, happiness_rank: 19, gdp_per_capita: 1.31, life_expectancy: 80.6, year: 2017 },
    { country: "United Kingdom", region: "Europe", happiness_score: 6.725, happiness_rank: 23, gdp_per_capita: 1.30, life_expectancy: 80.5, year: 2016 },
    { country: "United Kingdom", region: "Europe", happiness_score: 6.867, happiness_rank: 21, gdp_per_capita: 1.30, life_expectancy: 80.4, year: 2015 },
    { country: "Germany", region: "Europe", happiness_score: 6.985, happiness_rank: 17, gdp_per_capita: 1.37, life_expectancy: 80.9, year: 2019 },
    { country: "Germany", region: "Europe", happiness_score: 6.965, happiness_rank: 15, gdp_per_capita: 1.36, life_expectancy: 80.8, year: 2018 },
    { country: "Germany", region: "Europe", happiness_score: 6.951, happiness_rank: 16, gdp_per_capita: 1.36, life_expectancy: 80.7, year: 2017 },
    { country: "Germany", region: "Europe", happiness_score: 6.951, happiness_rank: 16, gdp_per_capita: 1.35, life_expectancy: 80.6, year: 2016 },
    { country: "Germany", region: "Europe", happiness_score: 6.750, happiness_rank: 26, gdp_per_capita: 1.35, life_expectancy: 80.5, year: 2015 },
    { country: "Ireland", region: "Europe", happiness_score: 7.021, happiness_rank: 16, gdp_per_capita: 1.48, life_expectancy: 81.7, year: 2019 },
    { country: "Ireland", region: "Europe", happiness_score: 6.977, happiness_rank: 14, gdp_per_capita: 1.48, life_expectancy: 81.6, year: 2018 },
    { country: "Ireland", region: "Europe", happiness_score: 6.977, happiness_rank: 15, gdp_per_capita: 1.47, life_expectancy: 81.5, year: 2017 },
    { country: "Ireland", region: "Europe", happiness_score: 6.907, happiness_rank: 19, gdp_per_capita: 1.46, life_expectancy: 81.4, year: 2016 },
    { country: "Ireland", region: "Europe", happiness_score: 6.940, happiness_rank: 18, gdp_per_capita: 1.46, life_expectancy: 81.3, year: 2015 },
    { country: "Belgium", region: "Europe", happiness_score: 6.923, happiness_rank: 18, gdp_per_capita: 1.35, life_expectancy: 81.1, year: 2019 },
    { country: "Belgium", region: "Europe", happiness_score: 6.927, happiness_rank: 16, gdp_per_capita: 1.35, life_expectancy: 81.0, year: 2018 },
    { country: "Belgium", region: "Europe", happiness_score: 6.891, happiness_rank: 17, gdp_per_capita: 1.34, life_expectancy: 80.9, year: 2017 },
    { country: "Belgium", region: "Europe", happiness_score: 6.929, happiness_rank: 18, gdp_per_capita: 1.34, life_expectancy: 80.8, year: 2016 },
    { country: "Belgium", region: "Europe", happiness_score: 6.937, happiness_rank: 19, gdp_per_capita: 1.34, life_expectancy: 80.7, year: 2015 },
    { country: "Luxembourg", region: "Europe", happiness_score: 7.090, happiness_rank: 14, gdp_per_capita: 1.68, life_expectancy: 82.2, year: 2019 },
    { country: "Luxembourg", region: "Europe", happiness_score: 7.238, happiness_rank: 17, gdp_per_capita: 1.67, life_expectancy: 82.1, year: 2018 },
    { country: "Luxembourg", region: "Europe", happiness_score: 7.165, happiness_rank: 18, gdp_per_capita: 1.66, life_expectancy: 82.0, year: 2017 },
    { country: "Luxembourg", region: "Europe", happiness_score: 6.871, happiness_rank: 20, gdp_per_capita: 1.65, life_expectancy: 81.9, year: 2016 },
    { country: "Luxembourg", region: "Europe", happiness_score: 6.862, happiness_rank: 20, gdp_per_capita: 1.64, life_expectancy: 81.8, year: 2015 },
    { country: "France", region: "Europe", happiness_score: 6.592, happiness_rank: 24, gdp_per_capita: 1.34, life_expectancy: 82.4, year: 2019 },
    { country: "France", region: "Europe", happiness_score: 6.489, happiness_rank: 23, gdp_per_capita: 1.33, life_expectancy: 82.3, year: 2018 },
    { country: "France", region: "Europe", happiness_score: 6.442, happiness_rank: 31, gdp_per_capita: 1.33, life_expectancy: 82.2, year: 2017 },
    { country: "France", region: "Europe", happiness_score: 6.478, happiness_rank: 32, gdp_per_capita: 1.32, life_expectancy: 82.1, year: 2016 },
    { country: "France", region: "Europe", happiness_score: 6.505, happiness_rank: 29, gdp_per_capita: 1.31, life_expectancy: 82.0, year: 2015 },
    { country: "Italy", region: "Europe", happiness_score: 6.223, happiness_rank: 36, gdp_per_capita: 1.31, life_expectancy: 83.3, year: 2019 },
    { country: "Italy", region: "Europe", happiness_score: 6.000, happiness_rank: 47, gdp_per_capita: 1.30, life_expectancy: 83.2, year: 2018 },
    { country: "Italy", region: "Europe", happiness_score: 5.964, happiness_rank: 48, gdp_per_capita: 1.29, life_expectancy: 83.1, year: 2017 },
    { country: "Italy", region: "Europe", happiness_score: 5.948, happiness_rank: 50, gdp_per_capita: 1.29, life_expectancy: 83.0, year: 2016 },
    { country: "Italy", region: "Europe", happiness_score: 5.948, happiness_rank: 50, gdp_per_capita: 1.28, life_expectancy: 82.9, year: 2015 },
    { country: "Spain", region: "Europe", happiness_score: 6.354, happiness_rank: 30, gdp_per_capita: 1.30, life_expectancy: 83.0, year: 2019 },
    { country: "Spain", region: "Europe", happiness_score: 6.310, happiness_rank: 36, gdp_per_capita: 1.29, life_expectancy: 82.9, year: 2018 },
    { country: "Spain", region: "Europe", happiness_score: 6.403, happiness_rank: 34, gdp_per_capita: 1.28, life_expectancy: 82.8, year: 2017 },
    { country: "Spain", region: "Europe", happiness_score: 6.361, happiness_rank: 37, gdp_per_capita: 1.28, life_expectancy: 82.7, year: 2016 },
    { country: "Spain", region: "Europe", happiness_score: 6.329, happiness_rank: 36, gdp_per_capita: 1.27, life_expectancy: 82.6, year: 2015 },
    { country: "Russia", region: "Europe", happiness_score: 5.648, happiness_rank: 68, gdp_per_capita: 1.18, life_expectancy: 72.6, year: 2019 },
    { country: "Russia", region: "Europe", happiness_score: 5.810, happiness_rank: 59, gdp_per_capita: 1.18, life_expectancy: 72.5, year: 2018 },
    { country: "Russia", region: "Europe", happiness_score: 5.963, happiness_rank: 49, gdp_per_capita: 1.17, life_expectancy: 72.4, year: 2017 },
    { country: "Russia", region: "Europe", happiness_score: 5.856, happiness_rank: 56, gdp_per_capita: 1.16, life_expectancy: 72.3, year: 2016 },
    { country: "Russia", region: "Europe", happiness_score: 5.716, happiness_rank: 64, gdp_per_capita: 1.15, life_expectancy: 72.2, year: 2015 },
    { country: "China", region: "Asia", happiness_score: 5.191, happiness_rank: 93, gdp_per_capita: 0.96, life_expectancy: 76.7, year: 2019 },
    { country: "China", region: "Asia", happiness_score: 5.273, happiness_rank: 86, gdp_per_capita: 0.95, life_expectancy: 76.6, year: 2018 },
    { country: "China", region: "Asia", happiness_score: 5.273, happiness_rank: 79, gdp_per_capita: 0.94, life_expectancy: 76.5, year: 2017 },
    { country: "China", region: "Asia", happiness_score: 5.245, happiness_rank: 83, gdp_per_capita: 0.94, life_expectancy: 76.4, year: 2016 },
    { country: "China", region: "Asia", happiness_score: 5.140, happiness_rank: 84, gdp_per_capita: 0.93, life_expectancy: 76.3, year: 2015 },
    { country: "Japan", region: "Asia", happiness_score: 5.886, happiness_rank: 58, gdp_per_capita: 1.30, life_expectancy: 84.2, year: 2019 },
    { country: "Japan", region: "Asia", happiness_score: 5.915, happiness_rank: 54, gdp_per_capita: 1.29, life_expectancy: 84.1, year: 2018 },
    { country: "Japan", region: "Asia", happiness_score: 5.920, happiness_rank: 51, gdp_per_capita: 1.29, life_expectancy: 84.0, year: 2017 },
    { country: "Japan", region: "Asia", happiness_score: 5.920, happiness_rank: 53, gdp_per_capita: 1.28, life_expectancy: 83.9, year: 2016 },
    { country: "Japan", region: "Asia", happiness_score: 5.987, happiness_rank: 46, gdp_per_capita: 1.28, life_expectancy: 83.8, year: 2015 },
    { country: "India", region: "Asia", happiness_score: 4.015, happiness_rank: 140, gdp_per_capita: 0.76, life_expectancy: 68.8, year: 2019 },
    { country: "India", region: "Asia", happiness_score: 4.190, happiness_rank: 133, gdp_per_capita: 0.75, life_expectancy: 68.7, year: 2018 },
    { country: "India", region: "Asia", happiness_score: 4.315, happiness_rank: 122, gdp_per_capita: 0.74, life_expectancy: 68.6, year: 2017 },
    { country: "India", region: "Asia", happiness_score: 4.404, happiness_rank: 118, gdp_per_capita: 0.73, life_expectancy: 68.5, year: 2016 },
    { country: "India", region: "Asia", happiness_score: 4.565, happiness_rank: 117, gdp_per_capita: 0.72, life_expectancy: 68.4, year: 2015 },
    { country: "Brazil", region: "South America", happiness_score: 6.300, happiness_rank: 32, gdp_per_capita: 1.02, life_expectancy: 75.0, year: 2019 },
    { country: "Brazil", region: "South America", happiness_score: 6.419, happiness_rank: 28, gdp_per_capita: 1.01, life_expectancy: 74.9, year: 2018 },
    { country: "Brazil", region: "South America", happiness_score: 6.635, happiness_rank: 22, gdp_per_capita: 1.00, life_expectancy: 74.8, year: 2017 },
    { country: "Brazil", region: "South America", happiness_score: 6.952, happiness_rank: 17, gdp_per_capita: 0.99, life_expectancy: 74.7, year: 2016 },
    { country: "Brazil", region: "South America", happiness_score: 6.983, happiness_rank: 16, gdp_per_capita: 0.98, life_expectancy: 74.6, year: 2015 },
    { country: "Argentina", region: "South America", happiness_score: 6.086, happiness_rank: 47, gdp_per_capita: 0.93, life_expectancy: 76.3, year: 2019 },
    { country: "Argentina", region: "South America", happiness_score: 6.388, happiness_rank: 29, gdp_per_capita: 0.92, life_expectancy: 76.2, year: 2018 },
    { country: "Argentina", region: "South America", happiness_score: 6.599, happiness_rank: 24, gdp_per_capita: 0.91, life_expectancy: 76.1, year: 2017 },
    { country: "Argentina", region: "South America", happiness_score: 6.574, happiness_rank: 26, gdp_per_capita: 0.90, life_expectancy: 76.0, year: 2016 },
    { country: "Argentina", region: "South America", happiness_score: 6.574, happiness_rank: 30, gdp_per_capita: 0.89, life_expectancy: 75.9, year: 2015 },
    { country: "Chile", region: "South America", happiness_score: 6.444, happiness_rank: 26, gdp_per_capita: 1.05, life_expectancy: 80.5, year: 2019 },
    { country: "Chile", region: "South America", happiness_score: 6.476, happiness_rank: 25, gdp_per_capita: 1.04, life_expectancy: 80.4, year: 2018 },
    { country: "Chile", region: "South America", happiness_score: 6.652, happiness_rank: 20, gdp_per_capita: 1.03, life_expectancy: 80.3, year: 2017 },
    { country: "Chile", region: "South America", happiness_score: 6.705, happiness_rank: 24, gdp_per_capita: 1.02, life_expectancy: 80.2, year: 2016 },
    { country: "Chile", region: "South America", happiness_score: 6.670, happiness_rank: 27, gdp_per_capita: 1.01, life_expectancy: 80.1, year: 2015 },
    { country: "Colombia", region: "South America", happiness_score: 6.262, happiness_rank: 43, gdp_per_capita: 0.87, life_expectancy: 77.3, year: 2019 },
    { country: "Colombia", region: "South America", happiness_score: 6.357, happiness_rank: 37, gdp_per_capita: 0.86, life_expectancy: 77.2, year: 2018 },
    { country: "Colombia", region: "South America", happiness_score: 6.481, happiness_rank: 36, gdp_per_capita: 0.85, life_expectancy: 77.1, year: 2017 },
    { country: "Colombia", region: "South America", happiness_score: 6.481, happiness_rank: 31, gdp_per_capita: 0.84, life_expectancy: 77.0, year: 2016 },
    { country: "Colombia", region: "South America", happiness_score: 6.477, happiness_rank: 33, gdp_per_capita: 0.83, life_expectancy: 76.9, year: 2015 },
    { country: "Mexico", region: "North America", happiness_score: 6.595, happiness_rank: 23, gdp_per_capita: 1.02, life_expectancy: 76.7, year: 2019 },
    { country: "Mexico", region: "North America", happiness_score: 6.488, happiness_rank: 24, gdp_per_capita: 1.01, life_expectancy: 76.6, year: 2018 },
    { country: "Mexico", region: "North America", happiness_score: 6.578, happiness_rank: 25, gdp_per_capita: 1.01, life_expectancy: 76.5, year: 2017 },
    { country: "Mexico", region: "North America", happiness_score: 6.778, happiness_rank: 21, gdp_per_capita: 1.00, life_expectancy: 76.4, year: 2016 },
    { country: "Mexico", region: "North America", happiness_score: 7.187, happiness_rank: 14, gdp_per_capita: 0.99, life_expectancy: 76.3, year: 2015 },
    { country: "South Korea", region: "Asia", happiness_score: 5.895, happiness_rank: 54, gdp_per_capita: 1.28, life_expectancy: 82.7, year: 2019 },
    { country: "South Korea", region: "Asia", happiness_score: 5.875, happiness_rank: 57, gdp_per_capita: 1.27, life_expectancy: 82.6, year: 2018 },
    { country: "South Korea", region: "Asia", happiness_score: 5.838, happiness_rank: 55, gdp_per_capita: 1.26, life_expectancy: 82.5, year: 2017 },
    { country: "South Korea", region: "Asia", happiness_score: 5.838, happiness_rank: 56, gdp_per_capita: 1.25, life_expectancy: 82.4, year: 2016 },
    { country: "South Korea", region: "Asia", happiness_score: 5.984, happiness_rank: 47, gdp_per_capita: 1.25, life_expectancy: 82.3, year: 2015 },
    { country: "Turkey", region: "Asia", happiness_score: 5.373, happiness_rank: 79, gdp_per_capita: 1.04, life_expectancy: 75.0, year: 2019 },
    { country: "Turkey", region: "Asia", happiness_score: 5.483, happiness_rank: 74, gdp_per_capita: 1.03, life_expectancy: 74.9, year: 2018 },
    { country: "Turkey", region: "Asia", happiness_score: 5.500, happiness_rank: 69, gdp_per_capita: 1.02, life_expectancy: 74.8, year: 2017 },
    { country: "Turkey", region: "Asia", happiness_score: 5.389, happiness_rank: 78, gdp_per_capita: 1.02, life_expectancy: 74.7, year: 2016 },
    { country: "Turkey", region: "Asia", happiness_score: 5.332, happiness_rank: 76, gdp_per_capita: 1.01, life_expectancy: 74.6, year: 2015 },
    { country: "Saudi Arabia", region: "Asia", happiness_score: 6.375, happiness_rank: 28, gdp_per_capita: 1.29, life_expectancy: 74.8, year: 2019 },
    { country: "Saudi Arabia", region: "Asia", happiness_score: 6.480, happiness_rank: 33, gdp_per_capita: 1.28, life_expectancy: 74.7, year: 2018 },
    { country: "Saudi Arabia", region: "Asia", happiness_score: 6.480, happiness_rank: 37, gdp_per_capita: 1.28, life_expectancy: 74.6, year: 2017 },
    { country: "Saudi Arabia", region: "Asia", happiness_score: 6.411, happiness_rank: 34, gdp_per_capita: 1.27, life_expectancy: 74.5, year: 2016 },
    { country: "Saudi Arabia", region: "Asia", happiness_score: 6.411, happiness_rank: 35, gdp_per_capita: 1.27, life_expectancy: 74.4, year: 2015 },
    { country: "South Africa", region: "Africa", happiness_score: 4.722, happiness_rank: 106, gdp_per_capita: 0.94, life_expectancy: 64.1, year: 2019 },
    { country: "South Africa", region: "Africa", happiness_score: 4.724, happiness_rank: 105, gdp_per_capita: 0.93, life_expectancy: 64.0, year: 2018 },
    { country: "South Africa", region: "Africa", happiness_score: 4.828, happiness_rank: 101, gdp_per_capita: 0.93, life_expectancy: 63.9, year: 2017 },
    { country: "South Africa", region: "Africa", happiness_score: 4.875, happiness_rank: 116, gdp_per_capita: 0.92, life_expectancy: 63.8, year: 2016 },
    { country: "South Africa", region: "Africa", happiness_score: 4.642, happiness_rank: 113, gdp_per_capita: 0.92, life_expectancy: 63.7, year: 2015 },
    { country: "Nigeria", region: "Africa", happiness_score: 5.265, happiness_rank: 85, gdp_per_capita: 0.70, life_expectancy: 55.2, year: 2019 },
    { country: "Nigeria", region: "Africa", happiness_score: 5.155, happiness_rank: 91, gdp_per_capita: 0.69, life_expectancy: 55.1, year: 2018 },
    { country: "Nigeria", region: "Africa", happiness_score: 5.074, happiness_rank: 95, gdp_per_capita: 0.69, life_expectancy: 55.0, year: 2017 },
    { country: "Nigeria", region: "Africa", happiness_score: 4.875, happiness_rank: 103, gdp_per_capita: 0.68, life_expectancy: 54.9, year: 2016 },
    { country: "Nigeria", region: "Africa", happiness_score: 5.268, happiness_rank: 78, gdp_per_capita: 0.68, life_expectancy: 54.8, year: 2015 },
    { country: "Kenya", region: "Africa", happiness_score: 4.509, happiness_rank: 121, gdp_per_capita: 0.55, life_expectancy: 64.6, year: 2019 },
    { country: "Kenya", region: "Africa", happiness_score: 4.509, happiness_rank: 124, gdp_per_capita: 0.54, life_expectancy: 64.5, year: 2018 },
    { country: "Kenya", region: "Africa", happiness_score: 4.553, happiness_rank: 112, gdp_per_capita: 0.54, life_expectancy: 64.4, year: 2017 },
    { country: "Kenya", region: "Africa", happiness_score: 4.518, happiness_rank: 122, gdp_per_capita: 0.53, life_expectancy: 64.3, year: 2016 },
    { country: "Kenya", region: "Africa", happiness_score: 4.419, happiness_rank: 125, gdp_per_capita: 0.53, life_expectancy: 64.2, year: 2015 },
    { country: "Egypt", region: "Africa", happiness_score: 4.166, happiness_rank: 137, gdp_per_capita: 0.80, life_expectancy: 71.7, year: 2019 },
    { country: "Egypt", region: "Africa", happiness_score: 4.419, happiness_rank: 122, gdp_per_capita: 0.80, life_expectancy: 71.6, year: 2018 },
    { country: "Egypt", region: "Africa", happiness_score: 4.735, happiness_rank: 104, gdp_per_capita: 0.79, life_expectancy: 71.5, year: 2017 },
    { country: "Egypt", region: "Africa", happiness_score: 4.613, happiness_rank: 120, gdp_per_capita: 0.78, life_expectancy: 71.4, year: 2016 },
    { country: "Egypt", region: "Africa", happiness_score: 4.194, happiness_rank: 135, gdp_per_capita: 0.78, life_expectancy: 71.3, year: 2015 },
    { country: "Morocco", region: "Africa", happiness_score: 5.208, happiness_rank: 89, gdp_per_capita: 0.84, life_expectancy: 76.7, year: 2019 },
    { country: "Morocco", region: "Africa", happiness_score: 5.254, happiness_rank: 85, gdp_per_capita: 0.83, life_expectancy: 76.6, year: 2018 },
    { country: "Morocco", region: "Africa", happiness_score: 5.235, happiness_rank: 84, gdp_per_capita: 0.82, life_expectancy: 76.5, year: 2017 },
    { country: "Morocco", region: "Africa", happiness_score: 5.151, happiness_rank: 90, gdp_per_capita: 0.82, life_expectancy: 76.4, year: 2016 },
    { country: "Morocco", region: "Africa", happiness_score: 5.013, happiness_rank: 92, gdp_per_capita: 0.81, life_expectancy: 76.3, year: 2015 },
    { country: "Ghana", region: "Africa", happiness_score: 4.996, happiness_rank: 98, gdp_per_capita: 0.60, life_expectancy: 63.5, year: 2019 },
    { country: "Ghana", region: "Africa", happiness_score: 4.945, happiness_rank: 108, gdp_per_capita: 0.59, life_expectancy: 63.4, year: 2018 },
    { country: "Ghana", region: "Africa", happiness_score: 5.011, happiness_rank: 108, gdp_per_capita: 0.59, life_expectancy: 63.3, year: 2017 },
    { country: "Ghana", region: "Africa", happiness_score: 4.633, happiness_rank: 124, gdp_per_capita: 0.58, life_expectancy: 63.2, year: 2016 },
    { country: "Ghana", region: "Africa", happiness_score: 4.276, happiness_rank: 114, gdp_per_capita: 0.57, life_expectancy: 63.1, year: 2015 },
    { country: "Uganda", region: "Africa", happiness_score: 4.432, happiness_rank: 133, gdp_per_capita: 0.48, life_expectancy: 60.2, year: 2019 },
    { country: "Uganda", region: "Africa", happiness_score: 4.161, happiness_rank: 136, gdp_per_capita: 0.47, life_expectancy: 60.1, year: 2018 },
    { country: "Uganda", region: "Africa", happiness_score: 4.189, happiness_rank: 135, gdp_per_capita: 0.47, life_expectancy: 60.0, year: 2017 },
    { country: "Uganda", region: "Africa", happiness_score: 4.081, happiness_rank: 133, gdp_per_capita: 0.46, life_expectancy: 59.9, year: 2016 },
    { country: "Uganda", region: "Africa", happiness_score: 3.931, happiness_rank: 138, gdp_per_capita: 0.46, life_expectancy: 59.8, year: 2015 },
    { country: "Senegal", region: "Africa", happiness_score: 4.682, happiness_rank: 111, gdp_per_capita: 0.51, life_expectancy: 67.9, year: 2019 },
    { country: "Senegal", region: "Africa", happiness_score: 4.534, happiness_rank: 111, gdp_per_capita: 0.50, life_expectancy: 67.8, year: 2018 },
    { country: "Senegal", region: "Africa", happiness_score: 4.682, happiness_rank: 106, gdp_per_capita: 0.50, life_expectancy: 67.7, year: 2017 },
    { country: "Senegal", region: "Africa", happiness_score: 4.631, happiness_rank: 118, gdp_per_capita: 0.49, life_expectancy: 67.6, year: 2016 },
    { country: "Senegal", region: "Africa", happiness_score: 4.681, happiness_rank: 113, gdp_per_capita: 0.49, life_expectancy: 67.5, year: 2015 },
    { country: "Ivory Coast", region: "Africa", happiness_score: 4.671, happiness_rank: 114, gdp_per_capita: 0.56, life_expectancy: 57.3, year: 2019 },
    { country: "Ivory Coast", region: "Africa", happiness_score: 4.671, happiness_rank: 109, gdp_per_capita: 0.55, life_expectancy: 57.2, year: 2018 },
    { country: "Ivory Coast", region: "Africa", happiness_score: 4.573, happiness_rank: 107, gdp_per_capita: 0.54, life_expectancy: 57.1, year: 2017 },
    { country: "Ivory Coast", region: "Africa", happiness_score: 4.436, happiness_rank: 128, gdp_per_capita: 0.54, life_expectancy: 57.0, year: 2016 },
    { country: "Ivory Coast", region: "Africa", happiness_score: 3.916, happiness_rank: 145, gdp_per_capita: 0.53, life_expectancy: 56.9, year: 2015 },
    { country: "Cameroon", region: "Africa", happiness_score: 4.439, happiness_rank: 133, gdp_per_capita: 0.52, life_expectancy: 58.5, year: 2019 },
    { country: "Cameroon", region: "Africa", happiness_score: 4.437, happiness_rank: 132, gdp_per_capita: 0.52, life_expectancy: 58.4, year: 2018 },
    { country: "Cameroon", region: "Africa", happiness_score: 4.695, happiness_rank: 114, gdp_per_capita: 0.51, life_expectancy: 58.3, year: 2017 },
    { country: "Cameroon", region: "Africa", happiness_score: 4.252, happiness_rank: 133, gdp_per_capita: 0.50, life_expectancy: 58.2, year: 2016 },
    { country: "Cameroon", region: "Africa", happiness_score: 4.695, happiness_rank: 136, gdp_per_capita: 0.50, life_expectancy: 58.1, year: 2015 },
    { country: "Zimbabwe", region: "Africa", happiness_score: 3.692, happiness_rank: 144, gdp_per_capita: 0.37, life_expectancy: 61.2, year: 2019 },
    { country: "Zimbabwe", region: "Africa", happiness_score: 3.692, happiness_rank: 146, gdp_per_capita: 0.37, life_expectancy: 61.1, year: 2018 },
    { country: "Zimbabwe", region: "Africa", happiness_score: 3.875, happiness_rank: 138, gdp_per_capita: 0.36, life_expectancy: 61.0, year: 2017 },
    { country: "Zimbabwe", region: "Africa", happiness_score: 3.875, happiness_rank: 142, gdp_per_capita: 0.36, life_expectancy: 60.9, year: 2016 },
    { country: "Zimbabwe", region: "Africa", happiness_score: 4.610, happiness_rank: 131, gdp_per_capita: 0.35, life_expectancy: 60.8, year: 2015 },
    { country: "Ethiopia", region: "Africa", happiness_score: 4.286, happiness_rank: 131, gdp_per_capita: 0.34, life_expectancy: 66.7, year: 2019 },
    { country: "Ethiopia", region: "Africa", happiness_score: 4.350, happiness_rank: 120, gdp_per_capita: 0.34, life_expectancy: 66.6, year: 2018 },
    { country: "Ethiopia", region: "Africa", happiness_score: 4.460, happiness_rank: 121, gdp_per_capita: 0.33, life_expectancy: 66.5, year: 2017 },
    { country: "Ethiopia", region: "Africa", happiness_score: 4.508, happiness_rank: 126, gdp_per_capita: 0.33, life_expectancy: 66.4, year: 2016 },
    { country: "Ethiopia", region: "Africa", happiness_score: 4.383, happiness_rank: 118, gdp_per_capita: 0.32, life_expectancy: 66.3, year: 2015 },
    { country: "Tanzania", region: "Africa", happiness_score: 3.476, happiness_rank: 148, gdp_per_capita: 0.51, life_expectancy: 65.8, year: 2019 },
    { country: "Tanzania", region: "Africa", happiness_score: 3.303, happiness_rank: 153, gdp_per_capita: 0.50, life_expectancy: 65.7, year: 2018 },
    { country: "Tanzania", region: "Africa", happiness_score: 3.349, happiness_rank: 153, gdp_per_capita: 0.50, life_expectancy: 65.6, year: 2017 },
    { country: "Tanzania", region: "Africa", happiness_score: 3.349, happiness_rank: 149, gdp_per_capita: 0.49, life_expectancy: 65.5, year: 2016 },
    { country: "Tanzania", region: "Africa", happiness_score: 3.702, happiness_rank: 147, gdp_per_capita: 0.49, life_expectancy: 65.4, year: 2015 },
    { country: "Mozambique", region: "Africa", happiness_score: 3.693, happiness_rank: 143, gdp_per_capita: 0.36, life_expectancy: 60.0, year: 2019 },
    { country: "Mozambique", region: "Africa", happiness_score: 3.540, happiness_rank: 142, gdp_per_capita: 0.35, life_expectancy: 59.9, year: 2018 },
    { country: "Mozambique", region: "Africa", happiness_score: 3.573, happiness_rank: 136, gdp_per_capita: 0.35, life_expectancy: 59.8, year: 2017 },
    { country: "Mozambique", region: "Africa", happiness_score: 3.520, happiness_rank: 142, gdp_per_capita: 0.34, life_expectancy: 59.7, year: 2016 },
    { country: "Mozambique", region: "Africa", happiness_score: 4.417, happiness_rank: 100, gdp_per_capita: 0.33, life_expectancy: 59.6, year: 2015 },
    { country: "Sierra Leone", region: "Africa", happiness_score: 3.655, happiness_rank: 146, gdp_per_capita: 0.26, life_expectancy: 54.3, year: 2019 },
    { country: "Sierra Leone", region: "Africa", happiness_score: 3.926, happiness_rank: 139, gdp_per_capita: 0.25, life_expectancy: 54.2, year: 2018 },
    { country: "Sierra Leone", region: "Africa", happiness_score: 4.709, happiness_rank: 133, gdp_per_capita: 0.25, life_expectancy: 54.1, year: 2017 },
    { country: "Sierra Leone", region: "Africa", happiness_score: 4.507, happiness_rank: 125, gdp_per_capita: 0.24, life_expectancy: 54.0, year: 2016 },
    { country: "Sierra Leone", region: "Africa", happiness_score: 4.507, happiness_rank: 113, gdp_per_capita: 0.23, life_expectancy: 53.9, year: 2015 },
    { country: "Rwanda", region: "Africa", happiness_score: 3.334, happiness_rank: 152, gdp_per_capita: 0.31, life_expectancy: 68.0, year: 2019 },
    { country: "Rwanda", region: "Africa", happiness_score: 3.408, happiness_rank: 151, gdp_per_capita: 0.30, life_expectancy: 67.9, year: 2018 },
    { country: "Rwanda", region: "Africa", happiness_score: 3.470, happiness_rank: 151, gdp_per_capita: 0.30, life_expectancy: 67.8, year: 2017 },
    { country: "Rwanda", region: "Africa", happiness_score: 3.470, happiness_rank: 153, gdp_per_capita: 0.29, life_expectancy: 67.7, year: 2016 },
    { country: "Rwanda", region: "Africa", happiness_score: 4.057, happiness_rank: 139, gdp_per_capita: 0.29, life_expectancy: 67.6, year: 2015 }
];




// Function to create and update the bar chart visualization
function updateVisualization(data) {
    // Clear previous visualizations
    svg.selectAll("*").remove();

    // X axis
    var x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d.country; }))
        .padding(0.2);

    // Adjust the transform to center the chart horizontally
    var xAxisTranslate = (width + margin.left + margin.right - x.range()[1]) / 2;

    svg.append("g")
        .attr("transform", "translate(" + xAxisTranslate + "," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "12px");

    // Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return +d.happiness_score; })])
        .range([height, 0]);
    svg.append("g")
        .attr("transform", "translate(" + xAxisTranslate + ",0)") // Adjust the Y axis position as well
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "12px");

    // Bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.country) + xAxisTranslate; }) // Adjust the bar positions
        .attr("y", function (d) { return y(d.happiness_score); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.happiness_score); })
        .on("mouseover", function (event, d) {
            d3.select(this).style("fill", "orange");
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip
                .html(d.country + "<br/>Year: " + d.year + "<br/>Happiness Score: " + d.happiness_score + "<br/>Happiness Rank: " + d.happiness_rank + "<br/>GDP per Capita: " + d.gdp_per_capita + "<br/>Life Expectancy: " + d.life_expectancy)
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
            d3.select(this).style("fill", "steelblue");
            tooltip.transition().duration(500).style("opacity", 0);
        })
        .on("click", function (event, d) {
            if (event.shiftKey) {
                showCountryTrends(d.country);  // Trigger country trends visualization if Shift key is pressed
            } else {
                showRegionalComparison(d.region);
            }
        });

    // Add Y axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "end")
        .attr("y", 0)
        .attr("x", -height / 2)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Happiness Score");

    // Add X axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom + 10)
        .text("Country");
}


// Function to create and update the line chart for country trends
function showCountryTrends(country) {
    var countryData = fullData.filter(function(d) { return d.country === country; });

    // Clear previous visualizations
    d3.selectAll(".line-chart").selectAll("*").remove();

    // Define line chart drawing function
    function drawLineChart(chartId, dataKey, yLabel) {
        var svgLine = d3.select(chartId)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height / 2 + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // X axis
        var x = d3.scaleTime()
            .domain(d3.extent(countryData, function(d) { return d3.timeParse("%Y")(d.year); }))
            .range([0, width]);
        svgLine.append("g")
            .attr("transform", "translate(0," + (height / 2) + ")")
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")))
            .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size", "12px");

        // Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(countryData, function (d) { return +d[dataKey]; })])
            .range([height / 2, 0]);
        svgLine.append("g")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .style("font-size", "12px");

        // Line
        var line = d3.line()
            .x(function(d) { return x(d3.timeParse("%Y")(d.year)); })
            .y(function(d) { return y(d[dataKey]); });

        svgLine.append("path")
            .datum(countryData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line);

        // Dots
        // Dots
		svgLine.selectAll("dot")
		    .data(countryData)
		    .enter()
		    .append("circle")
		    .attr("cx", function(d) { return x(d3.timeParse("%Y")(d.year)); })
		    .attr("cy", function(d) { return y(d[dataKey]); })
		    .attr("r", 5)
		    .attr("fill", "steelblue")
		    .on("mouseover", function(event, d) {
		        d3.select(this).attr("fill", "orange");
		        tooltip.transition().duration(200).style("opacity", 0.9);
		        tooltip
		            .html(d.country + "<br/>Year: " + d.year + "<br/>" + yLabel + ": " + d[dataKey])
		            .style("left", (event.pageX + 15) + "px")
		            .style("top", (event.pageY - 28) + "px");
		    })
		    .on("mouseout", function() {
		        d3.select(this).attr("fill", "steelblue");
		        tooltip.transition().duration(500).style("opacity", 0);
		    });



        // Add Y axis label
        svgLine.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "end")
            .attr("y", -40)
            .attr("x", -height / 4)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text(yLabel);

        // Add X axis label
        svgLine.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", (height / 2) + margin.bottom + 10)
            .text("Year");
    }

    drawLineChart("#happiness-score-chart", "happiness_score", "Happiness Score");
    drawLineChart("#happiness-rank-chart", "happiness_rank", "Happiness Rank");
    drawLineChart("#gdp-per-capita-chart", "gdp_per_capita", "GDP per Capita");
    drawLineChart("#life-expectancy-chart", "life_expectancy", "Life Expectancy");

    // Add global and regional averages for each year
    var years = d3.extent(fullData, function(d) { return d.year; });
    var globalAvg = {};
    var regionalAvg = {};

    for (var year = years[0]; year <= years[1]; year++) {
        globalAvg[year] = {};
        regionalAvg[year] = {};

        var yearData = fullData.filter(function(d) { return d.year === year; });

        var globalHappinessScoreSum = d3.sum(yearData, function(d) { return d.happiness_score; });
        var globalHappinessRankSum = d3.sum(yearData, function(d) { return d.happiness_rank; });
        var globalGdpSum = d3.sum(yearData, function(d) { return d.gdp_per_capita; });
        var globalLifeExpectancySum = d3.sum(yearData, function(d) { return d.life_expectancy; });

        globalAvg[year].happiness_score = globalHappinessScoreSum / yearData.length;
        globalAvg[year].happiness_rank = globalHappinessRankSum / yearData.length;
        globalAvg[year].gdp_per_capita = globalGdpSum / yearData.length;
        globalAvg[year].life_expectancy = globalLifeExpectancySum / yearData.length;

        var region = countryData[0].region;
        var regionalYearData = yearData.filter(function(d) { return d.region === region; });

        var regionalHappinessScoreSum = d3.sum(regionalYearData, function(d) { return d.happiness_score; });
        var regionalHappinessRankSum = d3.sum(regionalYearData, function(d) { return d.happiness_rank; });
        var regionalGdpSum = d3.sum(regionalYearData, function(d) { return d.gdp_per_capita; });
        var regionalLifeExpectancySum = d3.sum(regionalYearData, function(d) { return d.life_expectancy; });

        regionalAvg[year].happiness_score = regionalHappinessScoreSum / regionalYearData.length;
        regionalAvg[year].happiness_rank = regionalHappinessRankSum / regionalYearData.length;
        regionalAvg[year].gdp_per_capita = regionalGdpSum / regionalYearData.length;
        regionalAvg[year].life_expectancy = regionalLifeExpectancySum / regionalYearData.length;
    }

    function drawAverageLine(chartId, dataKey, avgData, color, label) {
        var svgLine = d3.select(chartId).select("svg").select("g");

        var x = d3.scaleTime()
            .domain(d3.extent(countryData, function(d) { return d3.timeParse("%Y")(d.year); }))
            .range([0, width]);

        var y = d3.scaleLinear()
            .domain([0, d3.max(countryData, function (d) { return +d[dataKey]; })])
            .range([height / 2, 0]);

        var avgLine = d3.line()
            .x(function(d) { return x(d3.timeParse("%Y")(d.year)); })
            .y(function(d) { return y(avgData[d.year][dataKey]); });

        svgLine.append("path")
            .datum(Object.keys(avgData).map(function(year) { return { year: year }; }))
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 1.5)
            .attr("d", avgLine);

        svgLine.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "end")
            .attr("x", width - 10)
            .attr("y", y(avgData[years[1]][dataKey]) - 10)
            .attr("fill", color)
            .text(label);
    }

    drawAverageLine("#happiness-score-chart", "happiness_score", globalAvg, "red", "Global Avg");
    drawAverageLine("#happiness-score-chart", "happiness_score", regionalAvg, "blue", "Regional Avg");

    drawAverageLine("#happiness-rank-chart", "happiness_rank", globalAvg, "red", "Global Avg");
    drawAverageLine("#happiness-rank-chart", "happiness_rank", regionalAvg, "blue", "Regional Avg");

    drawAverageLine("#gdp-per-capita-chart", "gdp_per_capita", globalAvg, "red", "Global Avg");
    drawAverageLine("#gdp-per-capita-chart", "gdp_per_capita", regionalAvg, "blue", "Regional Avg");

    drawAverageLine("#life-expectancy-chart", "life_expectancy", globalAvg, "red", "Global Avg");
    drawAverageLine("#life-expectancy-chart", "life_expectancy", regionalAvg, "blue", "Regional Avg");
}

// Regional comparison visualization
function showRegionalComparison(region) {
    var regionalData = fullData.filter(function (d) { return d.region === region; });
    updateVisualization(regionalData);
}

// Initial visualization for top 10 happiest countries in 2019
function initialVisualization() {
    updateVisualization(fullData.filter(d => d.year === 2019));
}

// Initial call to create the initial visualization
initialVisualization();

