-- CREATE SCHEMA --
USE X33303336

DROP TABLE IF EXISTS tblProductCategory;
DROP TABLE IF EXISTS tblProduct;
DROP TABLE IF EXISTS tblUser;
DROP TABLE IF EXISTS tblUserCategory;

CREATE TABLE tblProductCategory (
	PkID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	CategoryName VARCHAR(150)
);

CREATE TABLE tblProduct (
	PkID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	Name VARCHAR (500),
	Description LONGTEXT,
	Price FLOAT,
	Qty INT,
	FkProductCategory INT
);

CREATE TABLE tblUser (
	PkID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	UserName VARCHAR(100) NOT NULL UNIQUE,
	Password VARCHAR(100) NOT NULL,
	FName VARCHAR(100) NOT NULL,
	LName VARCHAR(100) NOT NULL,
	StreetAddress VARCHAR(200) NOT NULL,
	EmailAddress VARCHAR(200) NOT NULL,
	Phone VARCHAR(20) NOT NULL,
	FkUserCategory INT
);

CREATE TABLE tblUserCategory (
	PkID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	CategoryName VARCHAR(150)
);
-- INSERT DATA --
INSERT INTO tblUserCategory(CategoryName)
VALUES('Registered'),
('Support');

INSERT INTO tblUser(UserName, Password, FName, LName, StreetAddress, EmailAddress, Phone, FkUserCategory)
VALUES('user1', 'user1', 'user1', 'test', 'Murdoch University', 'user1@test.com.au', '1234512345', 1),
('user2', 'user2', 'user2', 'test', 'Murdoch University', 'user2@test.com.au', '1234512345', 1),
('user3', 'user3', 'user3', 'test', 'Murdoch University', 'user3@test.com.au', '1234512345', 1),
('staff1', 'staff1', 'staff1', 'test', 'Murdoch University', 'staff1@test.com.au', '1234512345', 2),
('staff2', 'staff2', 'staff2', 'test', 'Murdoch University', 'staff2@test.com.au', '1234512345', 2),
('staff3', 'staff3', 'staff3', 'test', 'Murdoch University', 'staff3@test.com.au', '1234512345', 2);

INSERT INTO tblProductCategory(CategoryName)
VALUES('Accessories'),
('Keyboards & Mice'),
('Headsets'),
('Gaming Hardware'),
('Mobile Phones'),
('Software');

INSERT INTO tblProduct(Name, Description, Price, Qty, FkProductCategory)
VALUES('Alpenfohn 3 ARGB High Speed PWM 120mm Fan Black', 'The Alpenfohn Wing Boost 3 ARGB PWM 120mm Fan Black is a PWM controlled fan that features air flow optimised fan blades, ARGB LED lighting, high-quality IC motor control that minimises electrical noise, a fluid dynamic bearing, and anti-vibration pads.', 35, 10, 1),
('Alpenfohn 3 ARGB PWM 120mm Fan White', 'The Alpenfohn Wing Boost 3 ARGB PWM 120mm Fan White is a PWM controlled fan that features air flow optimised fan blades, ARGB LED lighting, high-quality IC motor control that minimises electrical noise, a fluid dynamic bearing, and anti-vibration pads.', 35, 5, 1),
('Dell USB-C Power Adapter 65W', 'The Dell USB-C Power Adapter features 65 Watts to power and charge your laptop. It comes with a 1 metre power cord, rubber strap for easy cable management and LED light ring on the DC connector. Backed by a 1 year Dell warranty.', 39, 30, 1),
('Alogic DisplayPort to HDMI M-M Cable 1m', 'The Alogic Elements DisplayPort to HDMI Cable is designed to connect a PC enabled with a DisplayPort output to a display enabled with an HDMI input. The cable supports a maximum resolution of 1920 x 1080.', 19, 29, 1),
('PCCG Cat 6 Ethernet Cable Blue 50cm', 'PCCG Cat 6 Ethernet Cables are designed to handle ultra-high speeds and transfer large volumes of data. Cat 6 specified cables feature high-quality copper wiring designed to reduce impedance loss which make them ideal for networks running at Gigabit speeds. Blue in colour, 50cm in length.', 3, 2, 1),
('Glorious Model D Gaming Mouse Matte Black', 'Envisioned by a community of passionate gamers, and developed by a team who accepts nothing less than perfection - Model D will elevate your play to unimaginable heights. Built for speed, control, and comfort - we packed a full suite of ultra-premium features into an impossibly lightweight, ergonomic frame. Welcome to the next level of Competitive E-Sports gaming. Prepare for Ascension.', 89, 15, 2),
('Glorious Model O Gaming Mouse Matte White', 'The Glorious PC Gaming Race Model O was envisioned by a community of passionate gamers, and developed by a team who accepts nothing less than perfection - Model O will elevate your play to unimaginable heights. Built for speed, control, and comfort - Glorious have packed a full suite of ultra-premium features into an impossibly lightweight, ambidextrous frame. Welcome to the next level of Competitive E-Sports gaming. Prepare for Ascension.', 89, 22, 2),
('Logitech G203 LIGHTSYNC Gaming Mouse (Black)', 'Make the most of your game time with G203 gaming mouse available in a variety of vibrant colors. With LIGHTSYNC technology, a gaming-grade sensor and a classic 6-button design you\'ll light up your game and your desk.', 69, 11, 2),
('Logitech MX Master 3 Wireless Mouse Graphite', 'This Logitech MX Master 3 Wireless Mouse is ideal for those who work for long durations at their computer. Its silhouette is designed for the palm of your hand for comfort, with buttons on the side and gesture commands so that you can seamlessly control your work.', 149, 8, 2),
('Razer BlackWidow Gaming Keyboard', 'We\'ve fine-tuned our mechanical switches to unlock the highest level of gaming performance yet with the latest edition of the Razer Green Mechanical Switch. Game on with total clicky satisfaction and Razer Chroma lighting with the new Razer BlackWidow.', 159.95, 16, 2),
('Logitech Bluetooth Multi Device Keyboard White K480', 'The Logitech K480 Bluetooth Multi Device Keyboard can be connected to 3 Bluetooth devices simultaneously so you can use the Easy Switch dial to instantly change between devices. The keyboard has an innovative design which also incorporates a stand for your smartphone or tablet.', 78, 1, 2),
('ALCATROZ AIRPAD 1 (Black) Wireless Keyboard with Touchpad', 'Slim and low profiles, 104 square keypads with soft and silent keystrokes gives unique typing experience', 29, 39, 2),
('ASUS ROG Delta Core Gaming Headset for PC, Mac, Playstation 4, Xbox One and Nintendo Switch', 'ROG Delta Core is a 3.5mm gaming headset that supports all of your favorite gaming platforms.  With superb sound quality and an excellent balance of features, ROG Delta Core is ready to become an essential component in your gaming arsenal.', 79.95, 32, 3),
('ASUS ROG Delta White RGB gaming headset with Hi-Res ESS Quad-DAC, circular RBG lighting effect and USB-C', 'ROG Delta White Edition is the world\'s first gaming headset with industry-leading, hi-fi-grade ESS 9218 quad DAC, delivering impeccably clear and detailed sound. ROG Delta White Edition features a USB-C connector and USB-C to USB 2.0 adapter to let you game on your PC, console and mobile devices.', 149.95, 17, 3),
('Skullcandy Riff On-ear Headphones Grey and Crimson', 'These Skullcandy Riff Headphones are great for a high-quality audio experience on the go. It uses a headband to fit snugly, with touch buttons on the side to manage calls and music without having to open your phone. It also has the ability to fold up for easy storage.', 58, 5, 3),
('Razer Kraken X USB Gaming Headset', 'Feel complete gaming immersion without feeling the weight with the Razer Kraken X USB, a PC gaming headset that allows you to game comfortably for longer. With its ultra light comfort for non stop gaming and at just 275g with memory foam cushions and eyewear channels, the custom-tuned 40mm drivers, green earcup lighting and convenient audio control are all backed by a 2 year Razer warranty.', 99, 5, 3),
('ALCATROZ X-Craft (HP-3 PRO) 7.1 Surround Sound Gaming Headset', 'Headset with cool colours and patterns on the side. It allows you to game for hours and immerse yourself in the game.', 27, 8, 3),
('ASUS TUF GAMING MONITOR VG27AQ', 'From the latest anti-ghosting feature and overclocked 165Hz refresh rate, to variable refresh rate technology and a stunning IPS panel, the Asus VG27AQ is the best monitor for gaming and will see you through a GPU generation or two. ', 414, 20, 4),
('SONY DUALSHOCK 4 CONTROLLER', 'PC support for the PlayStation\'s DualShock 4 pad is growing. Valve has updated Steam to allow full configuration of the DS4 in the same way you can mess with the Steam controller.', 59, 4, 4),
('INTEL CORE I9 10900K', 'Intel\'s new Core i9 10900K is the world\'s fastest gaming CPU, but its painfully high price tag and TDP efficiency (or lack thereof) means it doesn\'t take the spot as the outright best CPU for gaming. But if money really isn\'t a thing for you, and if you have a monster CPU cooler then the deca-core from Intel is the best processor to pair with your high-end graphics card.', 209, 10, 4),
('ARCTIC LIQUID FREEZER 240', 'Arctic is offering the cheapest chiller we\'ve looked at by far. But Arctic is one of the few manufacturers to include enough fans in the box to set up a full push/pull configuration right out of the box. this budget CPU cooler offers great cooling potential and value for money and was almost our pick as the best liquid cooler overall.', 165, 18, 4),
('ADDLINK S70 1TB', 'For the same price as the 500GB Samsung 970 EVO Plus - our previous pick as the best SSD - you can get a drive that\'s twice the size, with a 5 year warranty, and performs as near as makes no difference.', 135, 13, 4),
('Samsung Galaxy Note20 256GB (Bronze)', 'Forget work-life balance, Galaxy Note20 gives you work-life flow. Hold the power of a computer in the palm of your hand and scribble with the S Pen that feels just like pen-to paper. Work smarter, play harder with our fastest Galaxy Note processor, stunning Infinity-O Display and incredible touch sensitivity.', 1499, 9, 5),
('Apple iPhone 11 128GB (Black)', 'Shoot 4K video, beautiful portraits and sweeping landscapes with the all-new dual-camera system. Capture your best low-light photos with Night mode. See true-to-life colour in your photos, videos and games on the 6.1-inch Liquid Retina display. Experience unprecedented performance with A13 Bionic for gaming, augmented reality and photography.', 1179, 26, 5),
('Samsung Galaxy S20 128GB (Cosmic Grey)', 'Galaxy S20 features a sleek modern design, next level capture and share and premium performance. Capture details in stunning clarity with up to 64MP ultra resolution telephoto camera, 10MP front selfie camera and ultra-wide capabilities. Get ready for the world\'s first ever smartphone with 8K video with 24fps.', 1149, 11, 5),
('Samsung Galaxy A51 128GB (Black)', 'Awesome screen, awesome camera, long lasting battery life. Capture, stream, and play to your heart\'s content. Capture your world from a new perspective, with a hi-res 48MP main camera, combined with Ultra Wide, Depth, and the new Macro lens.', 599, 7, 5),
('OPPO A9 2020 128GB (Green)', '48MP Rear Quad Camera, OPPO A9 2020 (A9) fits five separate cameras into a single smartphone. A 48MP rear main lens for maximum photo resolution. An Ultra Wide 119 degree rear lens for panoramic pictures.', 349, 9, 5),
('Norton 360 Premium 2019 (3-Device, 12-Month) [Digital Download]', 'Norton 360 provides you with powerful layers of protection for your connected devices and online privacy. Your PCs, Macs, tablets and smartphones have protection against viruses, ransomware, malware and other online threats as you bank, shop and post online. Your personal information, when transmitted through your devices, is much safer with Norton 360.', 79, 12, 6),
('Microsoft Office Home & Business 2019 [Digital Download]', 'For families and small businesses who want classic Office apps and email installed on one PC or Mac for use at home or work. Office 2019 Excel enriches your presentations with better scaling, Office 2019 Outlook offers exciting new intelligent features, With PowerPoint Zoom storytelling reaches a whole new level.', 209, 3, 6),
('Adobe Creative Cloud Photography (1-Year) [Digital Download]', 'Capture the moment and make it your own. Creative Cloud Photography gives you the tools to perfect your photography, whether you\'re a beginner or a pro. Start with Adobe Photoshop Lightroom for your everyday needs. Straighten photos, create stunning black and whites, and remove objects. Use Adobe Photoshop to do more, like combine multiple images or add text to photos.', 79, 8, 6),
('Microsoft Office Home & Student 2019 [Digital Download]', 'For students and families who want classic Office 2019 versions of Word, Excel, PowerPoint for Windows 10, installed on one PC or Mac for use at home or school, including 60 days of Microsoft support at no extra cost. Easier on the eyes across Word, Excel, PowerPoint, with Office 2019 Word Black Theme.', 109, 28, 6),
('Visio Professional 2019', 'Create professional diagrams easily with ready-made templates and shapes. Build and validate diagrams that support industry standards, including BPMN 2.0 and UML 2.5. Use your finger or pen to draw and annotate more naturally on a touch-enabled device. Create database visualizations using the built-in database model diagrams.', 299, 19, 6);