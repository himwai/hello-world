<?xml version="1.0" encoding="UTF-8" ?>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.net.URLDecoder"%>
<%@ page import="java.net.URLEncoder"%>

<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:url var="home" value="/"  />
<c:url var="resources" value="/resources" />

<!DOCTYPE html>
<html>

<head>
<meta charset="ISO-8859-1">
<title>Test React</title>
</head>

<body>
<div id="root" />

<script src="${resources}/bundle.js"></script>
</body>

</html>