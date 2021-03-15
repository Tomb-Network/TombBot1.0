const Discord = require("discord.js");
const api = "http://api.openweathermap.org/data/2.5/weather?q=";
const fetch = require('node-fetch');

//import { playtime } from '../utilities'

module.exports.run = async (bot, message, args) => {

	let units = args[2];
	let country = args[1];
	let city = args[0];

	if (!city || !country || !units)
		return message.channel.send("The Correct Format is `!weather <city> <countrycode> <units(c,f,k)>`");

	message.reply("Fetching Stats, this may take a while.").then(message => { message.delete({ timeout: 30000 }) });

	if (args[2] === "k") {
		units = "standard";
	} else if (args[2] === "K") {
		units = "standard";
	} else if (args[2] === "kelvin") {
		units = "standard";
	} else if (args[2] === "f") {
		units = "imperial";
	} else if (args[2] === "F") {
		units = "imperial";
	} else if (args[2] === "fahrenheit") {
		units = "imperial";
	} else if (args[2] === "c") {
		units = "metric";
	} else if (args[2] === "C") {
		units = "metric";
	} else if (args[2] === "celsius") {
		units = "metric";
	} else units = args[2];

	let embedUnit;
	if (units === "standard") {
		embedUnit = "K";
	} else if (units === "imperial") {
		embedUnit = "F";
	} else if (units === "metric") {
		embedUnit = "C";
	}
	
	if (args[0] === "Coastline"){
		city = "ibiza"
	}else if (args[0] === "coastline"){
		city = "ibiza"
	}else if (args[0] === "Yacht"){
		city = "Sanikiluaq"
	}else if (args[0] === "yacht"){
		city = "Sanikiluaq"
	}else if (args[0] === "oregon"){
		city = "waco"
	}else if (args[0] === "Oregon"){
		city = "waco"
	}
	(async () => {
		const body = { a: 1 };

		const response = await fetch(api + city + "," + country + "&appid=6e9189a4b6716b779d523d23bd45bfca&units=" + units, {
			method: 'get',
		});


		const json = await response.json();

		//	 console.log(json);
		//console.log(status);

		if (json.cod === 404) {
			return message.reply("City Not Found");
		}

		let windSpeed;
		if (units === "metric") {
			windSpeed = json.wind.speed * 3.6
		} else windSpeed = json.wind.speed

		let windFix = windSpeed.toFixed(3);
		let windFix1;
		if (units === "metric") {
			windFix1 = windFix + " km/h";
		} else windFix1 = windFix;

		let sunriseTimestamp = json.sys.sunrise;
		var risedate = new Date(sunriseTimestamp * 1000);
		var risehours = risedate.getHours();
		var riseminutes = "0" + risedate.getMinutes();
		var riseseconds = "0" + risedate.getSeconds();
		var formattedTimeRise = risehours + ':' + riseminutes.substr(-2) + ':' + riseseconds.substr(-2);

		let sunsetTimestamp = json.sys.sunset;
		var setdate = new Date(sunsetTimestamp * 1000);
		var sethours = setdate.getHours();
		var setminutes = "0" + setdate.getMinutes();
		var setseconds = "0" + setdate.getSeconds();
		var formattedTimeSet = sethours + ':' + setminutes.substr(-2) + ':' + setseconds.substr(-2);

		let timeTimestamp = json.dt;
		var date = new Date(timeTimestamp * 1000);
		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();
		var formattedTimeTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

		let visibility;
		if (units === "metric") {
			visibility = json.visibility / 1000
		} else if (units === "imperial") {
			visibility = json.visibility / 1760
		} else visibility = json.visibility / 1760

		let visFix = visibility.toFixed(3)
		let visFix1;
		if (units === "metric") {
			visFix1 = visFix + " km";
		} else if (units === "imperial") {
			visFix1 = visFix + " M";
		} else visFix1 = visFix + " M";

		let statsEmbed = new Discord.MessageEmbed()
		statsEmbed.setTitle(json.name + ", " + json.sys.country + "'s Weather")
		statsEmbed.setURL("https://openweathermap.org/city/" + json.id)
		statsEmbed.setThumbnail("http://openweathermap.org/img/wn/" + json.weather[0].icon + "@2x.png")
		statsEmbed.setColor("#00FFFF")
		statsEmbed.addField("Temperatures", "Current Temp: " + json.main.temp + embedUnit + '\n' + "Feels like: " + json.main.feels_like + embedUnit + '\n' + "Temp High: " + json.main.temp_max + embedUnit + '\n' + "Temp Low: " + json.main.temp_min + embedUnit, true)
		statsEmbed.addField("Weather", "Current Weather: " + json.weather[0].main + '\n' + "Weather Description: " + json.weather[0].description + '\n' + "Cloud Coverage: " + json.clouds.all + "%" + '\n' + "Wind: " + windFix1 + " @ " + json.wind.deg, true)
		statsEmbed.addField("Other", "Time Observed: " + formattedTimeTime + '\n' + "Sunrise: " + formattedTimeRise + '\n' + "Sunset: " + formattedTimeSet + '\n' + "Visibility: " + visFix1 + '\n' + "Humidity: " + json.main.humidity + "%" + '\n' + "Pressure: " + json.main.pressure + "hPa", true)
		statsEmbed.setFooter("Requested By: " + message.author.username, message.author.avatarURL())
		statsEmbed.setTimestamp()
		message.reply("Here is the weather for " + json.name + ", " + json.sys.country);
		message.channel.send(statsEmbed);
	})();

}

module.exports.help = {
	name: "weather"
}
