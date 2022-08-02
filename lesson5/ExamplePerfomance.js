const perf_hooks = require("perf_hooks")

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
	const entry = items.getEntriesByName("slow").pop()
	console.log(`${entry.name}: ${entry.duration}`);
	observer.disconnect()
}) 
performanceObserver.observe({entryTypes: ["measure"]})

function slow(){
	performance.mark("start")
	const arr = [];
	for (let i = 0; i < 100000; i++) {
		arr.push(i * i)
	}
	performance.mark("end")

	performance.measure("slow", "start", "end")
	//console.log(performance.getEntriesByName("slow"))
}
slow()