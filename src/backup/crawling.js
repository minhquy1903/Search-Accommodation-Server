const request = require("request");
const cheerio = require("cheerio");
const db = require("./db");
const Post = require("./postModel");
const User = require("./userModel");
const Order = require("./orderModel");

const formatDate = (date) => {
	const dateArr = date.split("/");
	return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
};

const randomMoney = () => {
	let rand = Math.floor(Math.random() * 9);
	if (rand === 0) return 50000;
	if (rand === 1) return 505000;
	if (rand === 2) return 125000;
	if (rand === 3) return 375000;
	if (rand === 4) return 3750000;
	if (rand === 5) return 325000;
	if (rand === 6) return 275000;
	if (rand === 7) return 175000;
	if (rand === 8) return 75000;
};

function getDetailPost(url, type) {
	request(url, async (err, res, html) => {
		if (!err && res.statusCode === 200) {
			const $ = cheerio.load(html);
			// console.log("------------");
			// console.log("url: ", url);
			// console.log("------------");

			/// crawl user information

			const username = $(".author-aside .author-name").text(); //get title post
			const phone = $(".author-aside .author-phone").text();

			///

			const title = $(".page-h1 a").text().toUpperCase(); //get title post

			let addressArray = $(".post-address").text(); //get address post
			addressArray = addressArray.split(",");
			addressArray = addressArray.map(
				(element) => (element = element.trim()),
			);
			let nAddress = addressArray.length;
			if (
				addressArray[nAddress - 4] === undefined ||
				addressArray[nAddress - 4] === null
			)
				return;

			const address = {
				street: addressArray[nAddress - 4].substring(
					9,
					addressArray[nAddress - 4].length,
				),
				ward: addressArray[nAddress - 3],
				district: addressArray[nAddress - 2],
				province: addressArray[nAddress - 1],
			};

			let descriptionArr = $(".post-main-content .section-content p").map(
				(i, element) => {
					return $(element).text();
				},
			);

			const description = [...descriptionArr];

			let area = $(".acreage span").text();
			area = area.match(/\d+/)[0];
			// area = area.trim().substring(0, area.length - 3);
			const retail = $(".price span").text().split(" ")[0];
			if (retail.length > 3) return;
			const typeAccommdation = 1;

			const imagesObj = $(".post-images .swiper-slide img").map(
				(i, element) => ({
					src: $(element).attr("src"),
					alt: $(element).attr("alt"),
				}),
			);

			const images = [...imagesObj];
			if (images.length === 0) return;
			const typePost = type;

			/// timeeeeeee
			const timeArr = $(".table td time").map((i, el) => {
				return el.attribs.title;
			});

			let time = [...timeArr];

			let date = time.map((el) => {
				return el.split(" ")[3];
			});
			let hours = time.map((el) => {
				return el.split(" ")[2];
			});

			const newDateC = new Date("2021-07-20T06:00:00");
			const timeStart = new Date(`${formatDate(date[0])}T06:00:00`);
			const timeEnd = new Date(newDateC);
			/////

			const usr = await User.findOne({ phone: phone });
			const checkTypePostMoney = (typePost) => {
				if (typePost === 1) return 50000;
				else if (typePost === 2) return 30000;
				else if (typePost === 3) return 20000;
				else if (typePost === 4) return 10000;
				else return 2000;
			};

			if (usr) {
				let user_id = usr._id;
				try {
					const newPost = new Post({
						timeStart,
						timeEnd,
						typePost,
						user_id,
						isConfirm: true,
						accommodation: {
							address,
							title,
							description,
							area,
							retail,
							typeAccommdation,
							images: images,
						},
					});

					newPost
						.save(/*(err, data) => {
							if (err) {
								console.log(err);

								throw new Error('fail to save');
							}
							console.log(data);
						}*/)
						.then((datum) => {
							let countDate = Math.abs(timeStart - timeEnd);
							countDate = Math.floor(
								countDate / (1000 * 3600 * 24),
							);
							let totalMoney =
								checkTypePostMoney(typePost) * countDate;
							const newOrder = new Order({
								date: timeStart,
								total: totalMoney,
								idPost: datum._id,
								typePost,
								user_id: user_id,
								numberDay: countDate,
							});
							newOrder.save((err, data) => {
								if (err) {
									console.log(err);

									throw new Error("fail to save");
								}
								console.log(data);
							});
						});
				} catch (error) {
					console.log(error);
				}
			}

			const createUser = new User({
				name: username,
				phone: phone,
				password: "123456789",
				money: randomMoney(),
				active: true,
				type: 1,
			});

			createUser.save().then((data) => {
				try {
					const newPost = new Post({
						timeStart,
						timeEnd,
						typePost,
						isConfirm: true,
						user_id: data._id,
						accommodation: {
							address,
							title,
							description,
							area,
							retail,
							typeAccommdation,
							images: images,
						},
					});

					newPost.save().then((datum) => {
						let countDate = Math.abs(timeStart - timeEnd);
						countDate = Math.floor(countDate / (1000 * 3600 * 24));
						let totalMoney =
							checkTypePostMoney(typePost) * countDate;
						const newOrder = new Order({
							date: timeStart,
							total: totalMoney,
							idPost: datum._id,
							typePost,
							user_id: data._id,
							numberDay: countDate,
						});

						newOrder.save((err, data) => {
							if (err) {
								console.log(err);

								throw new Error("fail to save");
							}
							console.log(data);
						});
					});
				} catch (error) {
					console.log(error);
				}
			});
		}
	});
}

// getDetailPost(
//   "https://phongtro123.com/tinh-thanh/ho-chi-minh/ki-tuc-xa-nu-cao-cap-day-du-tien-nghi-chuan-5-ngay-cmt8-va-to-hien-thanh-lh-0973373779.html",
//   1,
// );

function getUrlPost(url, type) {
	request(url, (err, res, html) => {
		if (!err && res.statusCode === 200) {
			const $ = cheerio.load(html);
			const urlPost = $(".section-post-listing figure a").map((i, el) => {
				return $(el).attr("href");
			});

			for (let i = 0; i < urlPost.length; i++) {
				getDetailPost(`https://phongtro123.com${urlPost[i]}`, type);
			}
		}
	});
}

for (let i = 1; i <= 500; i++) {
	if (i < 40) getUrlPost(`https://phongtro123.com/?page=${i}`, 1);
	else if (i < 200) getUrlPost(`https://phongtro123.com/?page=${i}`, 2);
	else getUrlPost(`https://phongtro123.com/?page=${i}`, 3);
}
