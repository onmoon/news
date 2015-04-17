'use strict'

var icons = ["cloud.svg", "cloudDrizzle.svg", "cloudDrizzleAlt.svg", "cloudDrizzleAltFill.svg",
 "cloudDrizzleFill.svg", "cloudDrizzleMoon.svg", "cloudDrizzleMoonAlt.svg", "cloudDrizzleMoonAltFill.svg",
 "cloudDrizzleMoonFill.svg", "cloudDrizzleSun.svg", "cloudDrizzleSunAlt.svg", "cloudDrizzleSunAltFill.svg",
 "cloudDrizzleSunFill.svg", "cloudFill.svg", "cloudFog.svg", "cloudFogAlt.svg", "cloudFogAltFill.svg", "cloudFogFill.svg",
 "cloudFogMoon.svg", "cloudFogMoonAlt.svg", "cloudFogMoonAltFill.svg", "cloudFogMoonFill.svg", "cloudFogSun.svg",
 "cloudFogSunAlt.svg", "cloudFogSunAltFill.svg", "cloudFogSunFill.svg", "cloudHailAlt.svg", "cloudHailAltFill.svg",
 "cloudHailAltMoon.svg", "cloudHailAltMoonFill.svg", "cloudHailAltSun.svg", "cloudHailAltSunFill.svg", "cloudLightning.svg",
 "cloudLightningFill.svg", "cloudLightningMoon.svg", "cloudLightningMoonFill.svg", "cloudLightningSun.svg", "cloudLightningSunFill.svg",
 "cloudMoon.svg", "cloudMoonFill.svg", "cloudRain.svg", "cloudRainAlt.svg", "cloudRainAltFill.svg", "cloudRainFill.svg",
 "cloudRainMoon.svg", "cloudRainMoonAlt.svg", "cloudRainMoonAltFill.svg", "cloudRainMoonFill.svg", "cloudRainSun.svg",
 "cloudRainSunAlt.svg", "cloudRainSunAltFill.svg", "cloudRainSunFill.svg", "cloudSnow.svg", "cloudSnowAlt.svg",
 "cloudSnowAltFill.svg", "cloudSnowFill.svg", "cloudSnowMoon.svg", "cloudSnowMoonAlt.svg",
 "cloudSnowMoonAltFill.svg", "cloudSnowMoonFill.svg", "cloudSnowSun.svg", "cloudSnowSunAlt.svg",
 "cloudSnowSunAltFill.svg", "cloudSnowSunFill.svg", "cloudSun.svg", "cloudSunFill.svg", "moon.svg", 
 "moonFill.svg", "moonPhase.svg", "moonPhaseFull.svg", "snowflake.svg", "snowflakeFill.svg", "sun.svg",
 "sunFill.svg", "sunrise.svg", "sunriseAlt.svg", "sunriseAltFill.svg", "sunriseFill.svg", "sunset.svg", 
 "sunsetAlt.svg", "sunsetAltFill.svg", "sunsetFill.svg", "thermometer0.svg", "thermometer100.svg", 
 "thermometer25.svg", "thermometer50.svg", "thermometer75.svg", "tornado.svg", "wind.svg"];

var codes = {
	200: "cloudLightning",
201: 'thunderstorm with rain',
202: 'thunderstorm with heavy rain',
210: 'light thunderstorm',
211: 'thunderstorm',
212: 'heavy thunderstorm',
221: 'ragged thunderstorm',
230: 'thunderstorm with light drizzle',
231: 'thunderstorm with drizzle',
232: 'thunderstorm with heavy drizzle',
	300: "cloudRainAlt",
	301: "cloudRainAlt",
	302: "cloudRainAlt",
	310: "cloudRainAlt",
	311: "cloudRainAlt",
	312: "cloudRainAlt",
313: 'shower rain and drizzle',
314: 'heavy shower rain and drizzle',
	321: "cloudRainAlt",
	500: "cloudDrizzleSun",
	501: "cloudDrizzleSun",
	502: "cloudDrizzle",
	503: "cloudDrizzleSunAlt",
	504: "cloudDrizzleAlt",
	511: "cloudRainSun",
	520: "cloudRain",
	521: "cloudSunRainAlt",
	522: "cloudRainAlt",
531: 'ragged shower rain',
	600: "cloudSnowSun",
	601: "cloudSnow",
	602: "cloudSnowSunAlt",
	611: "cloudSnow",
612: 'shower sleet',
615: 'light rain and snow',
616: 'rain and snow',
620: 'light shower snow',
	621: "cloudSnowAlt",
622: 'heavy shower snow',
	701: "cloudFogSunAlt",
	711: "cloudFogAlt",
	721: "cloudFogAlt",
	731: "cloudFogSun",
	741: "cloudFog",
751: 'sand',
761: 'dust',
762: 'volcanic ash',
771: 'squalls',
781: 'tornado',
	800: "sun",
	801: "cloudSun",
	802: "cloud",
	803: "cloudFill",
	804: "cloudFill",
	900: "tornado",
	901: "wind",
	902: "wind",
903: 'cold',
904: 'hot',
	905: "wind",
	906: "cloudHailAlt",
951: 'calm',
952: 'light breeze',
953: 'gentle breeze',
954: 'moderate breeze',
955: 'fresh breeze',
956: 'strong breeze',
957: 'high wind, near gale',
958: 'gale',
959: 'severe gale',
960: 'storm',
961: 'violent storm',
962: 'tornado'
}
module.exports = {
	getIcon : function (code) {
		return '/images/weather/' + codes[code] + '.svg'
	},
	getWay : function (deg) {
		return deg;
	}
}