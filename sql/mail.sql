-- 
-- Table structure for table `mail`
-- 

CREATE TABLE `mail` (
  `userID` varchar(100) NOT NULL,
  `mailID` varchar(100) NOT NULL,
  `Sender` varchar(100) NOT NULL,
  `Subject` varchar(1000) NOT NULL,
  `Message` varchar(10000) NOT NULL,
  `Date` varchar(200) NOT NULL,
  `Time` varchar(200) NOT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

