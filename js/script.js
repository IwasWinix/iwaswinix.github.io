/*
Configuration
------------------------
*/

const config = {
    serverInfo: {
        serverLogoImageFileName: "logo.png", /* This is a file name for logo in /images/ */
        serverName: "DeadMC", /* Server name */
        serverIp: "play.deadmc.xyz", /* Server IP */
        discordServerID: "1258905799879557161" /* Discord server ID */
    },

    /* Contact form */
    contactPage: {
        email: "support@deadmc.xyz"
    }
};

/* Mobile navbar (open, close) */
const navbar = document.querySelector(".navbar");
const navbarLinks = document.querySelector(".links");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    navbarLinks.classList.toggle("active");
});

/* FAQs */
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", () => {
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;

        if (accordionItemHeader.classList.contains("active")) 
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        else 
            accordionItemBody.style.maxHeight = "0px";
    });
});

/* Config navbar */
const serverName = document.querySelector(".server-name");
const serverLogo = document.querySelector(".logo-img");
/* Config header */
const serverIp = document.querySelector(".minecraft-server-ip");
const serverLogoHeader = document.querySelector(".logo-img-header");
const discordOnlineUsers = document.querySelector(".discord-online-users");
const minecraftOnlinePlayers = document.querySelector(".minecraft-online-players");
/* Config contact */
const contactForm = document.querySelector(".contact-form");
const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");

/* Fetch online user counts */
const getDiscordOnlineUsers = async () => {
    try {
        const discordServerId = config.serverInfo.discordServerID;
        const apiWidgetUrl = `https://discord.com/api/guilds/${discordServerId}/widget.json`;
        let response = await fetch(apiWidgetUrl);
        let data = await response.json();
        console.log("Discord data:", data); // Debugging line
        return data.presence_count ? data.presence_count : "None";
    } catch (e) {
        console.error("Error fetching Discord data:", e); // Debugging line
        return "None";
    }
};

const getMinecraftOnlinePlayer = async () => {
    try {
        const serverIp = config.serverInfo.serverIp;
        const apiUrl = `https://api.mcsrvstat.us/2/${serverIp}`;
        let response = await fetch(apiUrl);
        let data = await response.json();
        console.log("Minecraft data:", data); // Debugging line
        return data.players ? data.players.online : "None";
    } catch (e) {
        console.error("Error fetching Minecraft data:", e); // Debugging line
        return "None";
    }
};

const getUuidByUsername = async (username) => {
    try {
        const usernameToUuidApi = `https://api.minetools.eu/uuid/${username}`;
        let response = await fetch(usernameToUuidApi);
        let data = await response.json();
        console.log("UUID data:", data); // Debugging line
        return data.id;
    } catch (e) {
        console.error("Error fetching UUID:", e); // Debugging line
        return "None";
    }
};

const getSkinByUuid = async (username) => {
    try {
        const uuid = await getUuidByUsername(username);
        const skinByUuidApi = `https://visage.surgeplay.com/512/${uuid}`;
        let response = await fetch(skinByUuidApi);
        if (response.status === 400) 
            return `https://visage.surgeplay.com/512/ec561538f3fd461daff5086b22154bce`;
        else 
            return skinByUuidApi;
    } catch (e) {
        console.error("Error fetching skin:", e); // Debugging line
        return "None";
    }
};

/* IP copy functionality */
const copyIp = () => {
    const copyIpButton = document.querySelector(".copy-ip");
    const copyIpAlert = document.querySelector(".ip-copied");

    if (copyIpButton && copyIpAlert) {
        copyIpButton.addEventListener("click", () => {
            navigator.clipboard.writeText(config.serverInfo.serverIp)
                .then(() => {
                    copyIpAlert.innerHTML = "IP was successfully copied!";
                    copyIpAlert.classList.add("active");
                    setTimeout(() => {
                        copyIpAlert.classList.remove("active");
                    }, 5000);
                })
                .catch(err => {
                    console.error("Clipboard write failed:", err);
                    copyIpAlert.innerHTML = "Failed to copy IP!";
                    copyIpAlert.classList.add("active", "error");
                    setTimeout(() => {
                        copyIpAlert.classList.remove("active", "error");
                    }, 5000);
                });
        });
    } else {
        console.error("Copy IP button or alert not found.");
    }
};

/* Set data from config to HTML */
const setDataFromConfigToHtml = async () => {
    /* Set config data to navbar */
    serverName.innerHTML = config.serverInfo.serverName;
    serverLogo.src = `images/` + config.serverInfo.serverLogoImageFileName;

    /* Set config data to header */
    serverIp.innerHTML = config.serverInfo.serverIp;

    let locationPathname = location.pathname;

    if (locationPathname === "/" || locationPathname.includes("index")) {
        copyIp();
        serverLogoHeader.src = `images/` + config.serverInfo.serverLogoImageFileName;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayer();
    } else if (locationPathname.includes("rules")) {
        copyIp();
    } const setDataFromConfigToHtml = async () => {
    let locationPathname = location.pathname;

    if (locationPathname.includes("contact")) {
        if (contactForm && inputWithLocationAfterSubmit) {
            contactForm.action = `https://formsubmit.co/${config.contactPage.email}`;
            discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
            inputWithLocationAfterSubmit.value = location.href;
        } else {
            console.error("Contact form or input field not found.");
        }
    }
};

// Call the function to set data when the script loads
setDataFromConfigToHtml();
    }
};

// Call the function to set data when the script loads
setDataFromConfigToHtml();
