-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2+deb7u8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 02, 2018 at 07:07 AM
-- Server version: 5.7.20
-- PHP Version: 5.6.32-1~dotdeb+zts+7.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tabsera`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cities`
--

CREATE TABLE IF NOT EXISTS `tbl_cities` (
  `cityid` smallint(6) NOT NULL,
  `fullname` varchar(30) NOT NULL,
  `nativename` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `countryid` smallint(6) NOT NULL,
  PRIMARY KEY (`cityid`),
  KEY `tbl_cities_countries` (`countryid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_cities`
--

INSERT INTO `tbl_cities` (`cityid`, `fullname`, `nativename`, `countryid`) VALUES
(1, 'Rawalpindi', '', 1),
(2, 'Islamabad', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_countries`
--

CREATE TABLE IF NOT EXISTS `tbl_countries` (
  `countryid` smallint(6) NOT NULL,
  `fullname` varchar(30) NOT NULL,
  `nativename` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `domainsuffix` char(2) NOT NULL,
  `gsmcountrycode` char(3) NOT NULL,
  PRIMARY KEY (`countryid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_countries`
--

INSERT INTO `tbl_countries` (`countryid`, `fullname`, `nativename`, `domainsuffix`, `gsmcountrycode`) VALUES
(1, 'Pakistan', 'pak', 'pk', '092'),
(2, 'India', 'Indians', 'in', '091');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_developers`
--

CREATE TABLE IF NOT EXISTS `tbl_developers` (
  `developerid` int(11) NOT NULL AUTO_INCREMENT,
  `adminuserid` int(11) NOT NULL DEFAULT '0',
  `companyname` varchar(30) DEFAULT NULL,
  `credit` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cityid` smallint(6) NOT NULL,
  `commission` decimal(10,2) NOT NULL DEFAULT '0.00',
  `address` varchar(60) DEFAULT NULL,
  `lat` decimal(10,6) NOT NULL DEFAULT '0.000000',
  `lng` decimal(10,6) NOT NULL DEFAULT '0.000000',
  PRIMARY KEY (`developerid`),
  KEY `tbl_developers_cities` (`cityid`),
  KEY `tbl_developers_users` (`adminuserid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_developers`
--

INSERT INTO `tbl_developers` (`developerid`, `adminuserid`, `companyname`, `credit`, `cityid`, `commission`, `address`, `lat`, `lng`) VALUES
(2, 1, NULL, 10.00, 1, 2.00, NULL, 0.000000, 0.000000);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_developerusers`
--

CREATE TABLE IF NOT EXISTS `tbl_developerusers` (
  `developerid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `middlename` varchar(30) DEFAULT NULL,
  `lastname` varchar(30) NOT NULL,
  `gender` char(1) NOT NULL DEFAULT 'M',
  PRIMARY KEY (`developerid`,`userid`),
  KEY `tbl_developerusers_users` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_enrollmethods`
--

CREATE TABLE IF NOT EXISTS `tbl_enrollmethods` (
  `enrollmethodid` smallint(6) NOT NULL,
  `description` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`enrollmethodid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_enrollmethods`
--

INSERT INTO `tbl_enrollmethods` (`enrollmethodid`, `description`) VALUES
(1, 'purchase'),
(2, 'subscription'),
(3, 'demo'),
(4, 'points redemption');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_exerciseenrollments`
--

CREATE TABLE IF NOT EXISTS `tbl_exerciseenrollments` (
  `userid` int(11) NOT NULL,
  `exerciseid` int(11) NOT NULL,
  `iscompleted` bit(1) DEFAULT b'0',
  `isdownloaded` bit(1) DEFAULT b'0',
  `filepassword` varchar(30) DEFAULT NULL,
  `fileurl` varchar(100) NOT NULL,
  `enrolldate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`,`exerciseid`),
  KEY `tbl_exerciseenrollments_exercises` (`exerciseid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_exerciseenrollments`
--

INSERT INTO `tbl_exerciseenrollments` (`userid`, `exerciseid`, `iscompleted`, `isdownloaded`, `filepassword`, `fileurl`, `enrolldate`) VALUES
(4, 1, b'1', b'1', 'dummy', 'https://medlineplus.gov/', '2018-01-02 10:51:54'),
(7, 1, b'0', b'0', 'dummy', 'https://medlineplus.gov/', '2018-01-02 10:51:06');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_exerciseresults`
--

CREATE TABLE IF NOT EXISTS `tbl_exerciseresults` (
  `userid` int(11) NOT NULL,
  `exerciseid` int(11) NOT NULL,
  `questionid` int(11) NOT NULL,
  `iscorrect` bit(1) DEFAULT b'0',
  PRIMARY KEY (`userid`,`exerciseid`,`questionid`),
  KEY `tbl_exerciseresults_exercises` (`exerciseid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_exerciseresults`
--

INSERT INTO `tbl_exerciseresults` (`userid`, `exerciseid`, `questionid`, `iscorrect`) VALUES
(2, 1, 1, b'1'),
(2, 1, 2, b'0'),
(2, 1, 3, b'1'),
(3, 1, 1, b'0');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_exercises`
--

CREATE TABLE IF NOT EXISTS `tbl_exercises` (
  `exerciseid` int(11) NOT NULL AUTO_INCREMENT,
  `unitid` int(11) NOT NULL,
  `lessionid` int(11) DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8 NOT NULL,
  `exerciseminutes` smallint(6) DEFAULT NULL,
  `exerciseurl` varchar(30) NOT NULL,
  `isenabled` bit(1) DEFAULT b'0',
  PRIMARY KEY (`exerciseid`),
  KEY `tbl_exercises_units` (`unitid`),
  KEY `tbl_exercises_lessons` (`lessionid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tbl_exercises`
--

INSERT INTO `tbl_exercises` (`exerciseid`, `unitid`, `lessionid`, `description`, `exerciseminutes`, `exerciseurl`, `isenabled`) VALUES
(1, 2, 1, 'PHP Exercise', 15, 'https://medlineplus.gov/', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_grades`
--

CREATE TABLE IF NOT EXISTS `tbl_grades` (
  `gradeid` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `description` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `imageurl` varchar(30) DEFAULT NULL,
  `languageid` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`gradeid`),
  KEY `tbl_grades_languages` (`languageid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tbl_grades`
--

INSERT INTO `tbl_grades` (`gradeid`, `name`, `description`, `imageurl`, `languageid`) VALUES
(1, 'Play Group', NULL, NULL, 1),
(2, 'KG', NULL, NULL, 1),
(3, 'Pre Nursery', 'Pre Nursery Class', 'panda.jpg', 1),
(4, 'Prep', 'Prep class', 'http://funny.pho.to/', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_languages`
--

CREATE TABLE IF NOT EXISTS `tbl_languages` (
  `languageid` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `nativename` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `flagurl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`languageid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_languages`
--

INSERT INTO `tbl_languages` (`languageid`, `name`, `nativename`, `flagurl`) VALUES
(1, 'English', 'English', 'https://www.countries-ofthe-world.com/flags-normal/flag-of-United-States-of-America.png'),
(2, 'Arabic', 'عربي', 'https://www.countries-ofthe-world.com/flags-normal/flag-of-Saudi-Arabia.png');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lessonenrollments`
--

CREATE TABLE IF NOT EXISTS `tbl_lessonenrollments` (
  `userid` int(11) NOT NULL,
  `lessonid` int(11) NOT NULL,
  `secondsviewed` smallint(6) NOT NULL DEFAULT '0',
  `iscompleted` bit(1) DEFAULT b'0',
  `isdownloaded` bit(1) DEFAULT b'0',
  `filepassword` varchar(20) NOT NULL,
  `fileurl` varchar(100) NOT NULL,
  `enrolldate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`,`lessonid`),
  KEY `tbl_lessonenrollments_lessons` (`lessonid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_lessonenrollments`
--

INSERT INTO `tbl_lessonenrollments` (`userid`, `lessonid`, `secondsviewed`, `iscompleted`, `isdownloaded`, `filepassword`, `fileurl`, `enrolldate`) VALUES
(1, 2, 5, b'1', b'1', 'dummy', 'https://www.travel.com', '2018-01-02 10:27:03'),
(5, 1, 0, b'0', b'0', 'dummy', 'https://www.travel.com', '2018-01-02 10:34:56');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lessons`
--

CREATE TABLE IF NOT EXISTS `tbl_lessons` (
  `lessionid` int(11) NOT NULL AUTO_INCREMENT,
  `unitid` int(11) NOT NULL,
  `description` varchar(200) CHARACTER SET utf8 NOT NULL,
  `lessonminutes` smallint(6) DEFAULT NULL,
  `lessonurl` varchar(30) NOT NULL,
  `isenabled` bit(1) DEFAULT b'0',
  PRIMARY KEY (`lessionid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_lessons`
--

INSERT INTO `tbl_lessons` (`lessionid`, `unitid`, `description`, `lessonminutes`, `lessonurl`, `isenabled`) VALUES
(1, 2, 'Introduction to Five Senses', 20, 'www.lesson.com', b'1'),
(2, 3, '', 15, 'https://www.travel.com/', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_parents`
--

CREATE TABLE IF NOT EXISTS `tbl_parents` (
  `userid` int(11) NOT NULL,
  `firstname` varchar(30) CHARACTER SET utf8 NOT NULL,
  `middlename` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `lastname` varchar(30) CHARACTER SET utf8 NOT NULL,
  `gender` char(1) NOT NULL DEFAULT 'M',
  `dob` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `resellerid` int(11) DEFAULT '0',
  `credit` decimal(10,2) NOT NULL DEFAULT '0.00',
  `points` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cityid` smallint(6) NOT NULL,
  PRIMARY KEY (`userid`),
  KEY `tbl_parents_resellers` (`resellerid`),
  KEY `tbl_parents_cities` (`cityid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_parents`
--

INSERT INTO `tbl_parents` (`userid`, `firstname`, `middlename`, `lastname`, `gender`, `dob`, `resellerid`, `credit`, `points`, `cityid`) VALUES
(1, 'Ahmad', NULL, 'Khan', 'M', '2018-03-28 13:38:54', 1, 0.00, 0.00, 1),
(5, 'Ali', NULL, 'Khan', 'M', '2017-12-29 11:51:15', NULL, 110.00, 0.00, 2),
(6, 'Affan', NULL, 'Ali', 'M', '2018-01-29 09:07:17', NULL, 100.00, 0.00, 2),
(8, 'Maaz', NULL, 'Ali', 'M', '2017-12-29 07:04:48', NULL, 0.00, 0.00, 2),
(13, 'Hammad', NULL, 'Rahman', 'M', '2018-01-29 07:48:15', NULL, 0.00, 0.00, 2),
(16, 'jawwad', NULL, 'Ali', 'M', '2018-01-30 05:45:50', NULL, 15.00, 0.00, 2),
(19, 'Sobia', NULL, 'Arshad', 'M', '2018-01-30 09:29:11', NULL, 0.00, 0.00, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_paymentmethods`
--

CREATE TABLE IF NOT EXISTS `tbl_paymentmethods` (
  `paymentmethodid` smallint(6) NOT NULL,
  `description` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`paymentmethodid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_paymentmethods`
--

INSERT INTO `tbl_paymentmethods` (`paymentmethodid`, `description`) VALUES
(1, 'paypal'),
(2, 'airtime'),
(3, 'card'),
(4, 'voucher'),
(5, 'waafipay');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_resellers`
--

CREATE TABLE IF NOT EXISTS `tbl_resellers` (
  `resellerid` int(11) NOT NULL AUTO_INCREMENT,
  `adminuserid` int(11) NOT NULL DEFAULT '0',
  `companyname` varchar(30) NOT NULL,
  `schoolid` int(11) NOT NULL DEFAULT '0',
  `credit` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cityid` smallint(6) NOT NULL,
  `commission` decimal(10,2) NOT NULL DEFAULT '0.00',
  `address` varchar(60) DEFAULT NULL,
  `lat` decimal(10,6) NOT NULL DEFAULT '0.000000',
  `lng` decimal(10,6) NOT NULL DEFAULT '0.000000',
  PRIMARY KEY (`resellerid`),
  KEY `tbl_resellers_schools` (`schoolid`),
  KEY `tbl_resellers_cities` (`cityid`),
  KEY `tbl_resellers_users` (`adminuserid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tbl_resellers`
--

INSERT INTO `tbl_resellers` (`resellerid`, `adminuserid`, `companyname`, `schoolid`, `credit`, `cityid`, `commission`, `address`, `lat`, `lng`) VALUES
(1, 1, 'Honda', 1, 110.00, 2, 10.00, 'Trade Center', 0.000000, 0.000000),
(2, 1, 'Carinotech', 1, 480.00, 2, 50.00, 'Trade Center, F11', 33.683600, 72.990300);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_resellerusers`
--

CREATE TABLE IF NOT EXISTS `tbl_resellerusers` (
  `resellerid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `middlename` varchar(30) DEFAULT NULL,
  `lastname` varchar(30) NOT NULL,
  `gender` char(1) NOT NULL DEFAULT 'M',
  PRIMARY KEY (`resellerid`,`userid`),
  KEY `tbl_resellerusers_users` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_resellerusers`
--

INSERT INTO `tbl_resellerusers` (`resellerid`, `userid`, `firstname`, `middlename`, `lastname`, `gender`) VALUES
(2, 10, 'Abdullah', NULL, 'Ali', 'M');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schools`
--

CREATE TABLE IF NOT EXISTS `tbl_schools` (
  `schoolid` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(30) DEFAULT NULL,
  `cityid` smallint(6) DEFAULT NULL,
  `address` varchar(60) DEFAULT NULL,
  `lat` decimal(10,6) DEFAULT NULL,
  `lng` decimal(10,6) DEFAULT NULL,
  PRIMARY KEY (`schoolid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tbl_schools`
--

INSERT INTO `tbl_schools` (`schoolid`, `fullname`, `cityid`, `address`, `lat`, `lng`) VALUES
(1, 'Maple Tree School', 2, NULL, NULL, NULL),
(2, 'Beaconhouse', 1, 'E11', NULL, NULL),
(3, 'F G School', 2, 'F-11', NULL, NULL),
(4, 'Frobels International', 2, 'E-11', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sessions`
--

CREATE TABLE IF NOT EXISTS `tbl_sessions` (
  `sessionid` varchar(200) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `deviceid` varchar(30) DEFAULT NULL,
  `loginip` varchar(30) DEFAULT NULL,
  `logindate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isactive` bit(1) DEFAULT b'0',
  PRIMARY KEY (`sessionid`),
  KEY `tbl_sessions_users` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_sessions`
--

INSERT INTO `tbl_sessions` (`sessionid`, `userid`, `deviceid`, `loginip`, `logindate`, `isactive`) VALUES
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjMzMzU2MzQ1NSIsImlhdCI6MTUxNzIwNTc4NH0.MVE7SHWTJKM_eGrx11BerxVtkI6Mss9EmC7LNOoStdI', 5, '', '', '2018-01-29 06:02:45', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjMzMzU2MzQ1NSIsImlhdCI6MTUxNzIxMTA0NX0.UBBpFZlVRzZHDKCFgl-5mm4tMmjUq79yGGtHE2FiMZE', 6, '', '', '2018-01-29 07:30:26', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjMzMzU2MzQ1NSIsImlhdCI6MTUxNzIxNjY1MH0.wNNvxitZt-ecrpUdEME7BLDvQbripYwXo9KXf_Gm7HI', 6, '', '', '2018-01-29 09:03:50', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjMzMzU2MzQ1NTIxIiwiaWF0IjoxNTE3MjA0NzczfQ.jBfKC5tCc44TNLYzKsiBC_GZWz1JWp7_9ktp8NAjtlE', 7, '', '', '2018-01-29 05:45:54', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFsaTEyMyIsImlhdCI6MTUxNzIyMjUyMH0.DqBNwRlHg0j25eeTdfdveQtarf8fMFomww5nMRYu77k', 6, '', '', '2018-01-29 10:41:40', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFuYXlhMTIzIiwiaWF0IjoxNTE3Mjg4ODg3fQ.tqJC5vS9siKjGrVCz7Vyd4D-TECvXbXHipWTs58y-wg', 7, NULL, NULL, '2018-01-30 05:07:47', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFuYXlhMTIzIiwiaWF0IjoxNTE3MjIyMjkwfQ.ZzsIshHDiLxoPcvtWgc92pv6x2H65qiQ-S0GFf0dK24', 7, '', '', '2018-01-29 10:37:51', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6Imphd2FkMTIzIiwiaWF0IjoxNTE3MjI4NjE5fQ.V9FfFW-uCkjS09ZIYN7t_w8rDQ7y83xapWCfmytyF7U', 16, NULL, NULL, '2018-01-29 12:23:20', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6Imphd2FkMTIzIiwiaWF0IjoxNTE3MjIzNDg5fQ.TD4gLtg7-ADFNB60o2j-EWD68skqUEh5i1quAvpiBLM', 16, '', '', '2018-01-29 10:57:49', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6Imphd2FkMTIzIiwiaWF0IjoxNTE3MjIzNTgxfQ.CowuJxc-8jLWKhiMlzfvE-i6hpgB7h0st7FcaN9Bnsw', 16, NULL, NULL, '2018-01-29 10:59:21', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6Imphd2FkMTIzIiwiaWF0IjoxNTE3MjkxMTEyfQ.w8kP-eq_Eqs0JBQgFMX84Y-AuSFBbmvMzqgHYnhOro4', 16, NULL, NULL, '2018-01-30 05:44:52', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImRleHRlciIsImlhdCI6MTUyMjI5MTI2MH0.IGdKCSLfO5SNoqvZ2XSvMawcUFlVK-2Lq8ikoKGE-fA', 20, NULL, NULL, '2018-03-29 06:04:44', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImRleHRlciIsImlhdCI6MTUyMjIxODU4NH0.qEC4jkmxaoIOkdhDIUJST_vpTVKncA6LHg1S14mjV-w', 20, NULL, NULL, '2018-03-28 06:29:32', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImRleHRlciIsImlhdCI6MTUyMjIyMzA2Nn0.-buUC7Tohh-DHnwv7zoYYnHrAuim_j6R_d5MXGuuWGI', 20, NULL, NULL, '2018-03-28 07:44:14', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImRleHRlciIsImlhdCI6MTUyMjIzMTg4M30.GCO3b7rDi_s56cxN5A3HcS4b0z0ogv-Thf1ICZehOz4', 20, NULL, NULL, '2018-03-28 10:11:11', b'1'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImRleHRlciIsImlhdCI6MTUyMjIzNjI0MH0.xaUhLVaOrWd-tOe19c-BCiniqGVea0kwFl5fKxWU1c4', 20, NULL, NULL, '2018-03-28 11:23:48', b'1'),
('usersession', 5, NULL, NULL, '2018-01-02 09:44:14', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_students`
--

CREATE TABLE IF NOT EXISTS `tbl_students` (
  `userid` int(11) NOT NULL,
  `firstname` varchar(30) CHARACTER SET utf8 NOT NULL,
  `middlename` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `lastname` varchar(30) CHARACTER SET utf8 NOT NULL,
  `gender` char(1) NOT NULL DEFAULT 'M',
  `dob` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `schoolid` int(11) DEFAULT '0',
  `resellerid` int(11) DEFAULT '0',
  `parentuserid` int(11) DEFAULT '0',
  `teacheruserid` int(11) DEFAULT '0',
  `credit` decimal(10,2) NOT NULL DEFAULT '0.00',
  `points` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cityid` smallint(6) NOT NULL,
  PRIMARY KEY (`userid`),
  KEY `tbl_students_parents` (`parentuserid`),
  KEY `tbl_students_resellers` (`resellerid`),
  KEY `tbl_students_schools` (`schoolid`),
  KEY `tbl_students_cities` (`cityid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_students`
--

INSERT INTO `tbl_students` (`userid`, `firstname`, `middlename`, `lastname`, `gender`, `dob`, `schoolid`, `resellerid`, `parentuserid`, `teacheruserid`, `credit`, `points`, `cityid`) VALUES
(1, 'Amna', NULL, 'Ali', 'M', '2018-03-28 13:39:55', 1, NULL, NULL, NULL, -30.00, 0.00, 1),
(2, 'Ali', NULL, 'Ahmad', 'M', '2017-12-29 11:12:26', 1, NULL, NULL, NULL, 85.00, 0.00, 1),
(3, 'Abdullah', NULL, 'Zubair', 'M', '2017-12-27 09:46:38', 2, NULL, NULL, NULL, 0.00, 0.00, 1),
(4, 'Ayan', NULL, 'Ali', 'M', '2017-12-29 12:02:42', 1, NULL, NULL, NULL, 35.00, 0.00, 1),
(7, 'Anaya', NULL, 'Ali', 'M', '2018-01-30 05:39:03', NULL, NULL, 5, NULL, 50.00, 0.00, 2),
(12, 'Osama', NULL, 'Abid', 'M', '2018-01-29 07:13:26', NULL, NULL, NULL, NULL, 0.00, 0.00, 1),
(14, 'Abdullah', NULL, 'Ali', 'M', '2018-01-29 10:54:06', NULL, NULL, NULL, NULL, 0.00, 0.00, 2),
(15, 'Hassan', NULL, 'Ali', 'M', '2018-01-29 10:56:25', NULL, NULL, NULL, NULL, 0.00, 0.00, 2),
(17, 'Osama', NULL, 'Abid', 'M', '2018-01-30 08:11:56', NULL, NULL, NULL, NULL, 0.00, 0.00, 2),
(18, 'Laraib', NULL, 'Opel', 'M', '2018-01-30 09:27:51', NULL, NULL, NULL, NULL, 0.00, 0.00, 2),
(22, 'Osama', NULL, 'Abid', 'M', '2018-03-28 06:45:18', NULL, NULL, NULL, NULL, 0.00, 0.00, 1),
(23, 'Osama', NULL, 'Abid', 'M', '2018-03-28 08:03:05', NULL, NULL, NULL, NULL, 0.00, 0.00, 1),
(24, 'Osama', NULL, 'Abid', 'M', '2018-03-28 08:07:32', NULL, NULL, NULL, NULL, 0.00, 0.00, 1),
(25, 'Osama', NULL, 'Abid', 'M', '2018-03-28 08:57:26', NULL, NULL, NULL, NULL, 0.00, 0.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subjects`
--

CREATE TABLE IF NOT EXISTS `tbl_subjects` (
  `subjectid` smallint(6) NOT NULL AUTO_INCREMENT,
  `gradeid` smallint(6) DEFAULT NULL,
  `languageid` smallint(6) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `imageurl` varchar(30) DEFAULT NULL,
  `isenabled` bit(1) DEFAULT b'0',
  PRIMARY KEY (`subjectid`),
  KEY `tbl_subjects_grades` (`gradeid`),
  KEY `tbl_subjects_languages` (`languageid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tbl_subjects`
--

INSERT INTO `tbl_subjects` (`subjectid`, `gradeid`, `languageid`, `name`, `description`, `imageurl`, `isenabled`) VALUES
(1, 1, 1, 'Mathematics', NULL, NULL, b'1'),
(2, 1, 2, 'English', NULL, NULL, b'1'),
(3, 1, 2, 'Physics', 'Science Subject', 'https://www.travel-culture.com', b'0'),
(4, NULL, NULL, 'Geomatry', '', NULL, b'0');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_teachers`
--

CREATE TABLE IF NOT EXISTS `tbl_teachers` (
  `userid` int(11) NOT NULL,
  `firstname` varchar(30) CHARACTER SET utf8 NOT NULL,
  `middlename` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `lastname` varchar(30) CHARACTER SET utf8 NOT NULL,
  `gender` char(1) NOT NULL DEFAULT 'M',
  `dob` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `schoolid` int(11) DEFAULT '0',
  `credit` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tuition` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cityid` smallint(6) NOT NULL,
  PRIMARY KEY (`userid`),
  KEY `tbl_teachers_schools` (`schoolid`),
  KEY `tbl_teachers_cities` (`cityid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transactions`
--

CREATE TABLE IF NOT EXISTS `tbl_transactions` (
  `tranid` int(11) NOT NULL AUTO_INCREMENT,
  `reversedtranid` int(11) DEFAULT NULL,
  `trantypeid` smallint(6) NOT NULL,
  `trandate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transtatusid` smallint(6) DEFAULT '0',
  `paymentmethodid` smallint(6) DEFAULT '0',
  `description` varchar(100) NOT NULL,
  `userid` int(11) NOT NULL,
  `credit` decimal(10,2) NOT NULL DEFAULT '0.00',
  `debit` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`tranid`),
  KEY `tbl_transactions_trantypes` (`trantypeid`),
  KEY `tbl_transactions_users` (`userid`),
  KEY `tbl_transactions_paymentmethod` (`paymentmethodid`),
  KEY `tbl_transactions_transtatus` (`transtatusid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `tbl_transactions`
--

INSERT INTO `tbl_transactions` (`tranid`, `reversedtranid`, `trantypeid`, `trandate`, `transtatusid`, `paymentmethodid`, `description`, `userid`, `credit`, `debit`) VALUES
(1, NULL, 1, '2017-12-29 11:07:45', 1, 2, 'Adding Amount', 2, 0.00, 100.00),
(2, NULL, 1, '2017-12-29 11:10:55', 1, 2, 'Adding Amount', 2, 0.00, 10.00),
(3, NULL, 2, '2017-12-29 11:12:25', 1, 2, 'Purchase Unit', 2, 25.00, 0.00),
(4, NULL, 1, '2017-12-29 11:46:51', 1, 3, 'Adding Balance', 5, 0.00, 100.00),
(5, NULL, 1, '2017-12-29 11:49:53', 1, 3, 'Adding Balance', 5, 0.00, 25.00),
(6, NULL, 1, '2017-12-29 11:51:14', 1, 3, 'Purchase lesson', 5, 15.00, 0.00),
(7, NULL, 1, '2017-12-29 12:01:15', 1, 3, 'Adding Amount', 4, 0.00, 50.00),
(8, NULL, 4, '2017-12-29 12:02:41', 1, 3, 'Purchase Lesson', 4, 15.00, 0.00),
(9, NULL, 2, '2018-01-29 09:07:16', 1, 2, 'Add Credit', 6, 0.00, 100.00),
(10, NULL, 2, '2018-01-30 05:05:02', 1, 2, 'Add Credit', 6, 0.00, 20.00),
(11, NULL, 2, '2018-01-30 05:08:23', 1, 2, 'Add Credit', 7, 0.00, 20.00),
(12, NULL, 2, '2018-01-30 05:18:55', 1, 2, 'Add Credit', 7, 0.00, 5.00),
(13, NULL, 2, '2018-01-30 05:21:39', 1, 2, 'Add Credit', 7, 0.00, 5.00),
(14, NULL, 2, '2018-01-30 05:23:43', 1, 2, 'Add Credit', 7, 0.00, 5.00),
(15, NULL, 2, '2018-01-30 05:24:42', 1, 2, 'Add Credit', 7, 0.00, 5.00),
(16, NULL, 2, '2018-01-30 05:31:26', 1, 2, 'Add Credit', 7, 0.00, 2.00),
(17, NULL, 2, '2018-01-30 05:31:42', 1, 2, 'Add Credit', 7, 0.00, 2.00),
(18, NULL, 2, '2018-01-30 05:34:13', 1, 2, 'Add Credit', 7, 0.00, 1.00),
(19, NULL, 2, '2018-01-30 05:35:31', 1, 2, 'Add Credit', 7, 0.00, 1.00),
(20, NULL, 2, '2018-01-30 05:36:12', 1, 2, 'Add Credit', 7, 0.00, 1.00),
(21, NULL, 2, '2018-01-30 05:36:52', 1, 2, 'Add Credit', 7, 0.00, 2.00),
(22, NULL, 2, '2018-01-30 05:39:02', 1, 2, 'Add Credit', 7, 0.00, 2.00),
(23, NULL, 2, '2018-01-30 05:45:49', 1, 2, 'Add Credit', 16, 0.00, 15.00),
(24, 1, 1, '2018-03-28 13:36:08', NULL, 4, 'abcd', 1, 30.00, 0.00),
(25, 1, 1, '2018-03-28 13:38:53', NULL, 4, 'abcd', 1, 0.00, 30.00),
(26, 1, 1, '2018-03-28 13:39:55', NULL, 4, 'abcd', 1, 30.00, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transtatus`
--

CREATE TABLE IF NOT EXISTS `tbl_transtatus` (
  `transtatusid` smallint(6) NOT NULL,
  `description` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`transtatusid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_transtatus`
--

INSERT INTO `tbl_transtatus` (`transtatusid`, `description`) VALUES
(0, 'pending'),
(1, 'completed'),
(2, 'failed');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_trantypes`
--

CREATE TABLE IF NOT EXISTS `tbl_trantypes` (
  `trantypeid` smallint(6) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`trantypeid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_trantypes`
--

INSERT INTO `tbl_trantypes` (`trantypeid`, `description`) VALUES
(0, 'reversal'),
(1, 'credit purchase'),
(2, 'unit enrollment'),
(3, 'reseller credit purchase'),
(4, 'tution enrollment'),
(5, 'teacher tution credit'),
(6, 'teacher tution payment'),
(7, 'subscription enrollment');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_unitenrollments`
--

CREATE TABLE IF NOT EXISTS `tbl_unitenrollments` (
  `userid` int(11) NOT NULL,
  `unitid` int(11) NOT NULL,
  `tranid` int(11) NOT NULL DEFAULT '0',
  `unitcost` decimal(10,2) NOT NULL,
  `enrollmethodid` smallint(6) NOT NULL,
  `isenrolled` bit(1) DEFAULT b'0',
  `enrolldate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`,`unitid`),
  KEY `tbl_unitenrollments_units` (`unitid`),
  KEY `tbl_unitenrollments_enrollmethods` (`enrollmethodid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_unitenrollments`
--

INSERT INTO `tbl_unitenrollments` (`userid`, `unitid`, `tranid`, `unitcost`, `enrollmethodid`, `isenrolled`, `enrolldate`) VALUES
(4, 2, 4, 50.00, 3, b'1', '2018-01-01 07:09:57'),
(5, 3, 4, 30.00, 2, b'0', '2018-01-01 07:23:32'),
(7, 2, 6, 25.00, 3, b'1', '2018-01-01 07:46:00'),
(8, 2, 4, 200.00, 3, b'1', '2018-03-29 07:59:30');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_units`
--

CREATE TABLE IF NOT EXISTS `tbl_units` (
  `unitid` int(11) NOT NULL AUTO_INCREMENT,
  `subjectid` smallint(6) NOT NULL,
  `developerid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `unitprice` decimal(10,2) DEFAULT NULL,
  `isdemo` bit(1) DEFAULT b'0',
  `isenabled` bit(1) DEFAULT b'0',
  PRIMARY KEY (`unitid`),
  KEY `tbl_units_subjects` (`subjectid`),
  KEY `tbl_units_developers` (`developerid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `tbl_units`
--

INSERT INTO `tbl_units` (`unitid`, `subjectid`, `developerid`, `name`, `description`, `unitprice`, `isdemo`, `isenabled`) VALUES
(2, 1, 2, 'Aljebra', NULL, 5.00, b'0', b'1'),
(3, 2, 2, 'My Five Senses', NULL, 8.00, b'1', b'1'),
(5, 2, 2, 'Geomatry', '', 20.00, b'0', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE IF NOT EXISTS `tbl_users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `mobileno` varchar(20) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `username` varchar(40) NOT NULL,
  `usertypeid` smallint(6) NOT NULL DEFAULT '1',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `password` varchar(50) NOT NULL,
  `isenabled` bit(1) NOT NULL DEFAULT b'0',
  `ismobileverified` bit(1) NOT NULL DEFAULT b'0',
  `isemailverified` bit(1) NOT NULL DEFAULT b'0',
  `languageid` smallint(6) NOT NULL DEFAULT '1',
  `isloggedin` bit(1) NOT NULL DEFAULT b'0',
  `deviceid` varchar(30) DEFAULT NULL,
  `lastlogindate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastloginip` varchar(30) DEFAULT NULL,
  `sessiontoken` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  KEY `tbl_users_usertypes` (`usertypeid`),
  KEY `tbl_users_languages` (`languageid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`userid`, `mobileno`, `email`, `username`, `usertypeid`, `created_date`, `password`, `isenabled`, `ismobileverified`, `isemailverified`, `languageid`, `isloggedin`, `deviceid`, `lastlogindate`, `lastloginip`, `sessiontoken`) VALUES
(1, '333686766', NULL, 'amna123', 1, '2018-01-29 10:35:07', '123456', b'0', b'0', b'0', 1, b'0', NULL, '2017-12-27 06:14:13', NULL, NULL),
(2, '4567834', NULL, '', 1, '2018-01-29 05:10:16', '827ccb0eea8a706c4c34a16891f84e7b', b'0', b'0', b'0', 1, b'0', NULL, '2017-12-27 08:04:44', NULL, NULL),
(3, '3335634524', NULL, '', 1, '2017-12-28 07:45:09', '123456', b'0', b'0', b'0', 2, b'1', NULL, '2017-12-28 17:45:31', NULL, 'eyJhbGciOiJIUzI1NiIs'),
(4, '33356345543', NULL, '', 1, '2017-12-28 09:08:43', 'fcea920f7412b5da7be0cf42b8c93759', b'0', b'0', b'0', 1, b'1', NULL, '2017-12-28 19:09:05', NULL, 'eyJhbGciOiJIUzI1NiIs'),
(5, '333563455', NULL, '', 2, '2018-01-29 06:07:11', 'fcea920f7412b5da7be0cf42b8c93759', b'0', b'0', b'0', 1, b'1', NULL, '2018-01-29 16:03:04', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjMzMzU2MzQ1NSIsImlhdCI6MTUxNzIwNTc4NH0.MVE7SHWTJKM_eGrx11BerxVtkI6Mss9EmC7LNOoStdI'),
(6, '333563455', NULL, 'ali123', 2, '2018-01-29 10:41:40', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'0', 1, b'1', NULL, '2018-01-29 20:42:01', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFsaTEyMyIsImlhdCI6MTUxNzIyMjUyMH0.DqBNwRlHg0j25eeTdfdveQtarf8fMFomww5nMRYu77k'),
(7, '33356345521', NULL, 'anaya123', 1, '2018-01-30 05:07:46', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'0', 1, b'1', NULL, '2018-01-30 15:08:08', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFuYXlhMTIzIiwiaWF0IjoxNTE3Mjg4ODg3fQ.tqJC5vS9siKjGrVCz7Vyd4D-TECvXbXHipWTs58y-wg'),
(8, '33562435213', NULL, '', 2, '2017-12-29 07:04:48', 'f1887d3f9e6ee7a32fe5e76f4ab80d63', b'0', b'0', b'0', 1, b'0', NULL, '2017-12-29 07:04:48', NULL, NULL),
(9, '5644323', NULL, '', 4, '2018-01-01 06:08:09', 'f1887d3f9e6ee7a32fe5e76f4ab80d63', b'0', b'0', b'0', 1, b'0', NULL, '2018-01-01 06:08:09', NULL, NULL),
(10, '5644323', NULL, '', 4, '2018-01-01 06:08:40', 'f1887d3f9e6ee7a32fe5e76f4ab80d63', b'0', b'0', b'0', 1, b'0', NULL, '2018-01-01 06:08:40', NULL, NULL),
(11, '33356345573', NULL, '', 1, '2018-01-29 07:13:03', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'0', 1, b'0', NULL, '2018-01-29 07:13:03', NULL, NULL),
(12, '33343345573', NULL, '', 1, '2018-01-29 07:13:26', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'0', 1, b'0', NULL, '2018-01-29 07:13:26', NULL, NULL),
(13, '03345345573', 'sobia-1985@hotmail.com', '', 2, '2018-01-30 07:50:49', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'1', 2, b'0', NULL, '2018-01-29 07:48:15', NULL, NULL),
(14, '0334554327', NULL, 'abdullah123', 1, '2018-01-29 10:54:06', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'0', 1, b'0', '1', '2018-01-29 10:54:06', NULL, NULL),
(15, '01334554327', NULL, 'hassan123', 2, '2018-01-29 10:56:25', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'0', 1, b'0', NULL, '2018-01-29 10:56:25', NULL, NULL),
(16, '01334554327', NULL, 'jawad123', 2, '2018-01-30 05:44:51', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'0', 1, b'1', NULL, '2018-01-30 15:45:13', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6Imphd2FkMTIzIiwiaWF0IjoxNTE3MjkxMTEyfQ.w8kP-eq_Eqs0JBQgFMX84Y-AuSFBbmvMzqgHYnhOro4'),
(17, '09334554327', 'osamaabid03@gmail.com', 'osama123', 2, '2018-03-28 08:58:08', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'1', 1, b'0', NULL, '2018-01-30 08:11:56', NULL, NULL),
(18, '019334554327', 'sobiarshad2@gmail.com', 'laraib123', 2, '2018-01-30 09:28:11', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'1', 1, b'0', NULL, '2018-01-30 09:27:51', NULL, NULL),
(19, '0191334554327', 'sobia.arshad@carinotech.com', 'sobia123', 2, '2018-01-30 09:36:52', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'1', 1, b'0', NULL, '2018-01-30 09:29:11', NULL, NULL),
(20, '2155843', 'osama@gmail.com', 'dexter', 1, '2018-03-29 06:04:44', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'0', 1, b'1', '1', '2018-03-29 11:41:01', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImRleHRlciIsImlhdCI6MTUyMjI5MTI2MH0.IGdKCSLfO5SNoqvZ2XSvMawcUFlVK-2Lq8ikoKGE-fA'),
(21, '2155843', 'osamaabid03@gmail.com', 'shami', 1, '2018-03-28 08:58:08', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'1', 1, b'0', '1', '2018-03-28 06:43:43', NULL, NULL),
(22, '2155843', 'osamaabid03@gmail.com', 'shami1231', 1, '2018-03-28 08:58:08', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'1', 1, b'0', '1', '2018-03-28 06:45:18', NULL, NULL),
(23, '2155843', 'osamaabid03@gmail.com', 'aqil', 1, '2018-03-28 08:58:08', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'1', 1, b'0', '1', '2018-03-28 08:03:05', NULL, NULL),
(24, '2155843', 'osamaabid03@gmail.com', 'aqil1', 1, '2018-03-28 08:58:08', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'1', 1, b'0', '1', '2018-03-28 08:07:31', NULL, NULL),
(25, '2155843', 'osamaabid03@gmail.com', 'aqil11', 1, '2018-03-28 08:58:08', 'e10adc3949ba59abbe56e057f20f883e', b'0', b'0', b'1', 1, b'0', '1', '2018-03-28 08:57:26', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_usertypes`
--

CREATE TABLE IF NOT EXISTS `tbl_usertypes` (
  `usertypeid` smallint(6) NOT NULL AUTO_INCREMENT,
  `description` varchar(30) NOT NULL,
  PRIMARY KEY (`usertypeid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `tbl_usertypes`
--

INSERT INTO `tbl_usertypes` (`usertypeid`, `description`) VALUES
(1, 'Student'),
(2, 'Parent'),
(3, 'Teacher'),
(4, 'Reseller'),
(5, 'Developer'),
(6, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_vouchers`
--

CREATE TABLE IF NOT EXISTS `tbl_vouchers` (
  `voucherid` int(11) NOT NULL AUTO_INCREMENT,
  `vouchercode` varchar(8) NOT NULL,
  `credit` decimal(10,2) DEFAULT NULL,
  `resellerid` int(11) NOT NULL,
  `isWelcome` bit(1) DEFAULT b'0',
  `usedbyuserid` int(11) NOT NULL DEFAULT '0',
  `expirydate` timestamp NULL DEFAULT NULL,
  `useddate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`voucherid`),
  KEY `tbl_vouchers_resellers` (`resellerid`),
  KEY `tbl_vouchers_users` (`usedbyuserid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_cities`
--
ALTER TABLE `tbl_cities`
  ADD CONSTRAINT `tbl_cities_countries` FOREIGN KEY (`countryid`) REFERENCES `tbl_countries` (`countryid`);

--
-- Constraints for table `tbl_developers`
--
ALTER TABLE `tbl_developers`
  ADD CONSTRAINT `tbl_developers_cities` FOREIGN KEY (`cityid`) REFERENCES `tbl_cities` (`cityid`),
  ADD CONSTRAINT `tbl_developers_users` FOREIGN KEY (`adminuserid`) REFERENCES `tbl_users` (`userid`);

--
-- Constraints for table `tbl_developerusers`
--
ALTER TABLE `tbl_developerusers`
  ADD CONSTRAINT `tbl_developerusers_developers` FOREIGN KEY (`developerid`) REFERENCES `tbl_developers` (`developerid`),
  ADD CONSTRAINT `tbl_developerusers_users` FOREIGN KEY (`userid`) REFERENCES `tbl_users` (`userid`);

--
-- Constraints for table `tbl_exerciseenrollments`
--
ALTER TABLE `tbl_exerciseenrollments`
  ADD CONSTRAINT `tbl_exerciseenrollments_exercises` FOREIGN KEY (`exerciseid`) REFERENCES `tbl_exercises` (`exerciseid`),
  ADD CONSTRAINT `tbl_exerciseenrollments_users` FOREIGN KEY (`userid`) REFERENCES `tbl_users` (`userid`);

--
-- Constraints for table `tbl_exerciseresults`
--
ALTER TABLE `tbl_exerciseresults`
  ADD CONSTRAINT `tbl_exerciseresults_exercises` FOREIGN KEY (`exerciseid`) REFERENCES `tbl_exercises` (`exerciseid`),
  ADD CONSTRAINT `tbl_exerciseresults_users` FOREIGN KEY (`userid`) REFERENCES `tbl_users` (`userid`);

--
-- Constraints for table `tbl_exercises`
--
ALTER TABLE `tbl_exercises`
  ADD CONSTRAINT `tbl_exercises_lessons` FOREIGN KEY (`lessionid`) REFERENCES `tbl_lessons` (`lessionid`),
  ADD CONSTRAINT `tbl_exercises_units` FOREIGN KEY (`unitid`) REFERENCES `tbl_units` (`unitid`);

--
-- Constraints for table `tbl_grades`
--
ALTER TABLE `tbl_grades`
  ADD CONSTRAINT `tbl_grades_languages` FOREIGN KEY (`languageid`) REFERENCES `tbl_languages` (`languageid`);

--
-- Constraints for table `tbl_lessonenrollments`
--
ALTER TABLE `tbl_lessonenrollments`
  ADD CONSTRAINT `tbl_lessonenrollments_lessons` FOREIGN KEY (`lessonid`) REFERENCES `tbl_lessons` (`lessionid`),
  ADD CONSTRAINT `tbl_lessonenrollments_users` FOREIGN KEY (`userid`) REFERENCES `tbl_users` (`userid`);

--
-- Constraints for table `tbl_parents`
--
ALTER TABLE `tbl_parents`
  ADD CONSTRAINT `tbl_parents_cities` FOREIGN KEY (`cityid`) REFERENCES `tbl_cities` (`cityid`),
  ADD CONSTRAINT `tbl_parents_resellers` FOREIGN KEY (`resellerid`) REFERENCES `tbl_resellers` (`resellerid`),
  ADD CONSTRAINT `tbl_parents_users` FOREIGN KEY (`userid`) REFERENCES `tbl_users` (`userid`);

--
-- Constraints for table `tbl_resellers`
--
ALTER TABLE `tbl_resellers`
  ADD CONSTRAINT `tbl_resellers_cities` FOREIGN KEY (`cityid`) REFERENCES `tbl_cities` (`cityid`),
  ADD CONSTRAINT `tbl_resellers_schools` FOREIGN KEY (`schoolid`) REFERENCES `tbl_schools` (`schoolid`),
  ADD CONSTRAINT `tbl_resellers_users` FOREIGN KEY (`adminuserid`) REFERENCES `tbl_users` (`userid`);

--
-- Constraints for table `tbl_resellerusers`
--
ALTER TABLE `tbl_resellerusers`
  ADD CONSTRAINT `tbl_resellerusers_resellers` FOREIGN KEY (`resellerid`) REFERENCES `tbl_resellers` (`resellerid`),
  ADD CONSTRAINT `tbl_resellerusers_users` FOREIGN KEY (`userid`) REFERENCES `tbl_users` (`userid`);

--
-- Constraints for table `tbl_sessions`
--
ALTER TABLE `tbl_sessions`
  ADD CONSTRAINT `tbl_sessions_users` FOREIGN KEY (`userid`) REFERENCES `tbl_users` (`userid`);

--
-- Constraints for table `tbl_students`
--
ALTER TABLE `tbl_students`
  ADD CONSTRAINT `tbl_students_cities` FOREIGN KEY (`cityid`) REFERENCES `tbl_cities` (`cityid`),
  ADD CONSTRAINT `tbl_students_parents` FOREIGN KEY (`parentuserid`) REFERENCES `tbl_parents` (`userid`),
  ADD CONSTRAINT `tbl_students_resellers` FOREIGN KEY (`resellerid`) REFERENCES `tbl_resellers` (`resellerid`),
  ADD CONSTRAINT `tbl_students_schools` FOREIGN KEY (`schoolid`) REFERENCES `tbl_schools` (`schoolid`),
  ADD CONSTRAINT `tbl_students_users` FOREIGN KEY (`userid`) REFERENCES `tbl_users` (`userid`);

--
-- Constraints for table `tbl_subjects`
--
ALTER TABLE `tbl_subjects`
  ADD CONSTRAINT `tbl_subjects_grades` FOREIGN KEY (`gradeid`) REFERENCES `tbl_grades` (`gradeid`),
  ADD CONSTRAINT `tbl_subjects_languages` FOREIGN KEY (`languageid`) REFERENCES `tbl_languages` (`languageid`);

--
-- Constraints for table `tbl_teachers`
--
ALTER TABLE `tbl_teachers`
  ADD CONSTRAINT `tbl_teachers_cities` FOREIGN KEY (`cityid`) REFERENCES `tbl_cities` (`cityid`),
  ADD CONSTRAINT `tbl_teachers_schools` FOREIGN KEY (`schoolid`) REFERENCES `tbl_schools` (`schoolid`),
  ADD CONSTRAINT `tbl_teachers_users` FOREIGN KEY (`userid`) REFERENCES `tbl_users` (`userid`);

--
-- Constraints for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  ADD CONSTRAINT `tbl_transactions_paymentmethod` FOREIGN KEY (`paymentmethodid`) REFERENCES `tbl_paymentmethods` (`paymentmethodid`),
  ADD CONSTRAINT `tbl_transactions_transtatus` FOREIGN KEY (`transtatusid`) REFERENCES `tbl_transtatus` (`transtatusid`),
  ADD CONSTRAINT `tbl_transactions_trantypes` FOREIGN KEY (`trantypeid`) REFERENCES `tbl_trantypes` (`trantypeid`),
  ADD CONSTRAINT `tbl_transactions_users` FOREIGN KEY (`userid`) REFERENCES `tbl_users` (`userid`);

--
-- Constraints for table `tbl_unitenrollments`
--
ALTER TABLE `tbl_unitenrollments`
  ADD CONSTRAINT `tbl_unitenrollments_enrollmethods` FOREIGN KEY (`enrollmethodid`) REFERENCES `tbl_enrollmethods` (`enrollmethodid`),
  ADD CONSTRAINT `tbl_unitenrollments_units` FOREIGN KEY (`unitid`) REFERENCES `tbl_units` (`unitid`),
  ADD CONSTRAINT `tbl_unitenrollments_users` FOREIGN KEY (`userid`) REFERENCES `tbl_users` (`userid`);

--
-- Constraints for table `tbl_units`
--
ALTER TABLE `tbl_units`
  ADD CONSTRAINT `tbl_units_developers` FOREIGN KEY (`developerid`) REFERENCES `tbl_developers` (`developerid`),
  ADD CONSTRAINT `tbl_units_subjects` FOREIGN KEY (`subjectid`) REFERENCES `tbl_subjects` (`subjectid`);

--
-- Constraints for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD CONSTRAINT `tbl_users_languages` FOREIGN KEY (`languageid`) REFERENCES `tbl_languages` (`languageid`),
  ADD CONSTRAINT `tbl_users_usertypes` FOREIGN KEY (`usertypeid`) REFERENCES `tbl_usertypes` (`usertypeid`);

--
-- Constraints for table `tbl_vouchers`
--
ALTER TABLE `tbl_vouchers`
  ADD CONSTRAINT `tbl_vouchers_resellers` FOREIGN KEY (`resellerid`) REFERENCES `tbl_resellers` (`resellerid`),
  ADD CONSTRAINT `tbl_vouchers_users` FOREIGN KEY (`usedbyuserid`) REFERENCES `tbl_users` (`userid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
