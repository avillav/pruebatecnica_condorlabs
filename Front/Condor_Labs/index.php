
 <?php 

echo "php";
echo "<br>";echo "<br>";


  $featuredCourses_XML = file_get_contents("https://api.cebroker.com/v2/featuredCoursesProfession?profession=36");
  $featuredCourses_JSON = json_decode($featuredCourses_XML);

  /*
  print_r($featuredCourses_JSON);
  echo "<br>";echo "<br>";

  print_r($featuredCourses_JSON[0]);
  echo "<br>";echo "<br>";
  */

  //--objetos
  print($featuredCourses_JSON[0]->id);
  echo "<br>";echo "<br>";

  print($featuredCourses_JSON[0]->coursePublication->id);
  echo "<br>";echo "<br>";



//print_r($usuario[0]['coursePublication']);

echo "<br>";echo "<br>";echo "<br>";

 ?>










<!DOCTYPE html>
<html>

<head>
	<title>Search Courses</title>

	<link rel="stylesheet" href="css/my_style.css" />
</head>

<body>

	<!-- Header -->
	<header class="my_header">
		<ul class="ul_horizontal">
			<!-- first of last -->
			<li><a href="#">Login</a></li>
			<li><a href="#">Support Center</a></li>
			<li><a href="#">Florida</a></li>
		</ul>
	</header>


	<!-- Nav -->
	<nav class="my_nav">
		
		<ul class="ul_horizontal">
			<!-- first of last -->
			<a href="#"><img src="imgs/logo.png" class="my_img_logo"></a>

			<li><a href="#">7 day trial</a></li>
			<li><a href="#">About</a></li>
			<li><a href="#">Organizations</a></li>
			<li><a href="#">Course Search</a></li>
			<li><a href="#">Account Options</a></li>
			<li><a href="#">Features</a></li>
			
		</ul>
	</nav>

	<!-- Main -->
	<main>

		<!-- Section#1 == BANNER == COURSE SERACH -->
		<section class="my_banner_color">
			<div class="my_banner">
				<h2>Course Search</h2>
				<input type="text" name="txt_course_to_search">
				<input type="submit" name="btn_course_to_search">
				<h5>Florida | Registered Nurse Florida</h5>
			</div>
		</section>





		<!-- Section#2 == PUBLICITY == FEATURED COURSES -->
		<section>
			<h3>Featured Courses</h3>

			<div>
				<a href="#"><img src="imgs/curso_destacado1.png" class="my_img_featured_course"></a>
			</div>

		</section>



		<!-- Section#3 == RESULTS == COURSES -->
		<section>
			<h3><label name="num_results">###</label> Results</h3>

			<div>

				<table>

				  <tr>
				    <td><img src="imgs/curso_destacado1.png" class="my_img_featured_course"></td>
				    <td><img src="imgs/curso_destacado1.png" class="my_img_featured_course"></td>
				    <td><img src="imgs/curso_destacado1.png" class="my_img_featured_course"></td>
				  </tr>

				  <tr>
				    <td>Celda 4</td>
				    <td>Celda 5</td>
				    <td>Celda 6</td>
				  </tr>

				</table>
				
			</div>

			
			
		</section>
		
	</main>







</body>

</html>