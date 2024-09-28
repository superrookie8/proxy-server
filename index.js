const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

app.use(
	"/",
	createProxyMiddleware({
		target: "https://api.openai.com",
		changeOrigin: true,

		onProxyReq: (proxyReq, req, res) => {
			console.log("Proxying request:", req.method, req.url);
		},
		onProxyRes: (proxyRes, req, res) => {
			console.log("Received response:", proxyRes.statusCode);
		},
	})
);

app.listen(3000, () => {
	console.log("Proxy server is running on http://localhost:3000");
});
