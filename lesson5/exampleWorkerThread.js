const crypto = require("crypto");
const https = require("https");
const start = performance.now();

//По дефолту работают 4 ядра, но можно увеличить:
// process.env.UV_THREADPOOL_SIZE = 8
// for (let i = 0; i < 50; i++){
// 	crypto.pdkdf2("test", "salt", 10000, 64, "sha512", () => {
// 		console.log(performance.now() - start);
// 	})
// }

// Работа с https модулем осуществляется на одном ядре
for (let i = 0; i < 50; i++){
	https.get("https://yandex.ru", (res) =>{
		res.on("data", () => {})
		res.on("end", () => {
			console.log(performance.now() - start);
		})
	})
}
