#macro(DrawLanguageStrings $CDEContext)
	#if($CDEContext.Language == "es")##
		#set($videoContent = "Video")##
		#set($carouselContent = "Lista de reproducci&oacute;n de videos")##
		#set($infographicContent = "Infograf&iacute;a")##
		#set($postedString = "Publicaci&oacute;n")##
		#set($updatedString = "Actualizaci&oacute;n")##
		#set($reviewedString = "Revisi&oacute;n")##
		#set($newsString = "Todas las noticias del NCI")##
		#set($continueReading = "Siga leyendo")##
		#set($by = "por")##
	#else##
		#set($videoContent = "Video")##
		#set($carouselContent = "Video Playlist")##
		#set($infographicContent = "Infographic")##
		#set($postedString = "Posted")##
		#set($updatedString = "Updated")##
		#set($reviewedString = "Reviewed")##
		#set($newsString = "All NCI news")##
		#set($continueReading = "Continue Reading")##
		#set($by = "by")##
	#end##
#end##

#macro(DrawListItem $resultItem $showImage $showDate $showDescription $CDEContext)
	#if($resultItem.ContentType == "rx:nciFile")##
		#DrawListItemFile($resultItem $showImage $showDate $showDescription $CDEContext)##
	#elseif($resultItem.ContentType == "rx:cgvInfographic")##
		#DrawListItemInfographic($resultItem $showImage $showDate $showDescription $CDEContext)##
	#elseif($resultItem.ContentType == "rx:gloVideo")##
		#DrawListItemVideo($resultItem $showImage $showDate $showDescription $CDEContext)##
	#elseif($resultItem.ContentType == "rx:gloVideoCarousel")##
		#DrawListItemVideoCarousel($resultItem $showImage $showDate $showDescription $CDEContext)##
	#else##
		#DrawListItemGeneral($resultItem $showImage $showDate $showDescription $CDEContext)##
	#end##
#end##


#macro(DrawListItemFile $resultItem $showImage $showDate $showDescription $CDEContext)
	##
	## Set file size
	##
	#if($resultItem.FileSize < 1000)##
		#set($fileSize = "($resultItem.FileSize B)")##
	#else##
		#set($kbFileSize = ($resultItem.FileSize / 1000))##
		#if($kbFileSize < 1000)##
			#set($fileSize = "($kbFileSize KB)")##
		#else##
			#set($mbFileSize = ($kbFileSize / 1000))##
			#set($fileSize = "($mbFileSize MB)")##
		#end##
	#end##

	##
	## Set mime type
	##
	#set($printOutExt="")##
	#set($fileType = $resultItem.MimeType)##
	#if($fileType == "application/vnd.ms-excel" || $fileType == "application/excel" || $fileType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")##
		#set($fileClass = "list-excel")##
		#set($fileType_safe = "excel")##
	#elseif($fileType == "application/mspowerpoint" || $fileType== "application/vnd.ms-powerpoint" || $fileType == "application/vnd.openxmlformats-officedocument.presentationml.presentation")##
		#set($fileClass = "list-powerpoint")##
		#set($fileType_safe = "ppt")##
	#elseif($fileType == "application/msword" || $fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")##
		#set($fileClass = "list-word")##
		#set($fileType_safe = "word")##
	#elseif($fileType == "application/pdf")##
		#set($fileClass = "list-pdf")##
		#set($fileType_safe = "pdf")##
	#elseif($fileType == "application/octet-stream" || $fileType == "application/x-compressed" || $fileType == "application/x-msdownload")##
		#set($fileClass = "list-execute")##
		#set($fileType_safe = "exe")##
	#elseif($fileType == "application/epub+zip" || $fileType == "application/x-mobipocket-ebook")##
		#set($fileClass = "list-ebook")##
		#set($fileType_safe = "ebook")##
	#elseif($fileType == "text/plain")##
		#set($fileClass = "list-txt")##
		#set($fileType_safe = "txt")##
	#else##
		#set($fileClass = "list-item-link link")##
		#set($fileType_safe = "unknown")##
		#set($printOutExt = $fileType)##
	#end##

	<li class="file-list-item file $fileType_safe list-item $fileClass">##
		##
		## Show image if required
		##
		#if($showImage)
			#DrawImage($resultItem)
		#end##

		<div class="title-and-desc title desc container">##
			##
			## Display title
			##
			<a class="$fileClass title" href="$resultItem.Href" onclick="NCIAnalytics.SearchResults(this,$resultItem.RecNumber);">##
				$resultItem.LongTitle##
			</a>
			#if($fileType_safe != "")##
				<span class="filetype $fileType_safe">##
					<span class="hidden">$fileType_safe file</span>##
				</span>##
			#else##
				 <span class="filetype unknown">##
					($printOutExt <span class="hidden">file</span>)##
				</span>##
			#end##
			 <span class="filesize">$fileSize</span>##

			#if($showDate || $showLongDescription)##
				<div class="description">##
			#end##

			##
			## Show date if required
			##
			#if($showDate)
				#DrawDate($resultItem $CDEContext)
			#end##

			##
			## Show description if required
			##
			#if($showDescription)
				#DrawDescription($resultItem)
			#end##

			#if($showDate || $showLongDescription)##
				</div>##
			#end##
		</div>
	</li>
#end##


#macro(DrawListItemInfographic $resultItem $showImage $showDate $showDescription $CDEContext)
	<li class="infographic-list-item infographic list-item">##
		##
		## Show image if required
		##
		#if($showImage)
			#DrawImage($resultItem)
		#end##

		<div class="title-and-desc title desc container">##
			##
			## Display title
			##
			<a class="title" href="$resultItem.Href" onclick="NCIAnalytics.SearchResults(this,$resultItem.RecNumber);">
				$resultItem.LongTitle##
			</a>
			<span class="media-type">($infographicContent)</span>##

			#if($showDate || $showDescription)##
				<div class="description">##
			#end##

			##
			## Show date if required
			##
			#if($showDate)
				#DrawDate($resultItem $CDEContext)
			#end##

			##
			## Show description if required
			##
			#if($showDescription)
				#DrawDescription($resultItem)
			#end##

			#if($showDate || $showLongDescription)##
				</div>##
			#end##
		</div>
	</li>
#end##

#macro(DrawListItemVideo $resultItem $showImage $showDate $showDescription $CDEContext)
	<li class="video-list-item video list-item">##
		##
		## Show image if required
		##
		#if($showImage)
			#DrawImage($resultItem)
		#end##

		<div class="title-and-desc title desc container">##
			##
			## Display title
			##
			<a class="title" href="$resultItem.Href" onclick="NCIAnalytics.SearchResults(this,$resultItem.RecNumber);">
				$resultItem.LongTitle##
			</a>
			<span class="media-type">($videoContent)</span>##

			#if($showDate || $showDescription)##
				<div class="description">##
			#end##

			##
			## Show date if required
			##
			#if($showDate)
				#DrawDate($resultItem $CDEContext)
			#end##

			##
			## Show description if required
			##
			#if($showDescription)
				#DrawDescription($resultItem)
			#end##

			#if($showDate || $showLongDescription)##
				</div>##
			#end##
		</div>
	</li>
#end##

#macro(DrawListItemVideoCarousel $resultItem $showImage $showDate $showDescription $CDEContext)
	<li class="carousel-list-item carousel list-item">##
		##
		## Show image if required
		##
		#if($showImage)
			#DrawImage($resultItem)
		#end##

		<div class="title-and-desc title desc container">##
			##
			## Display title
			##
			<a class="title" href="$resultItem.Href" onclick="NCIAnalytics.SearchResults(this,$resultItem.RecNumber);">
				$resultItem.LongTitle##
			</a>
			<span class="media-type">($carouselContent)</span>##

			#if($showDate || $showDescription)##
				<div class="description">##
			#end##

			##
			## Show date if required
			##
			#if($showDate)
				#DrawDate($resultItem $CDEContext)
			#end##

			##
			## Show description if required
			##
			#if($showDescription)
				#DrawDescription($resultItem)
			#end##

			#if($showDate || $showLongDescription)##
				</div>##
			#end##
		</div>
	</li>
#end##

#macro(DrawListItemGeneral $resultItem $showImage $showDate $showDescription $CDEContext)
	<li class="general-list-item general list-item">##
		##
		## Show image if required
		##
		#if($showImage)
			#DrawImage($resultItem)
		#end##

		<div class="title-and-desc title desc container">##
			##
			## Display title
			##
			<a class="title" href="$resultItem.Href" onclick="NCIAnalytics.SearchResults(this,$resultItem.RecNumber);">
				$resultItem.LongTitle##
			</a>

			#if($showDate || $showDescription)##
				<div class="description">##
			#end##

			##
			## Show date if required
			##
			#if($showDate)
				#DrawDate($resultItem $CDEContext)
			#end##

			##
			## Show description if required
			##
			#if($showDescription)
				#DrawDescription($resultItem)
			#end##

			#if($showDate || $showLongDescription)##
				</div>##
			#end##
		</div>
	</li>
#end##

#macro(DrawBlogSeriesItem $resultItem $showImage $showDate $showDescription $CDEContext)
	<li class="general-list-item general list-item">##
		##
		## Show image if required
		##
		#if($showImage)
			#DrawImage($resultItem)
		#end##

		<div class="title-and-desc title desc container">##
			##
			## Display title
			##
			<a class="title" href="$resultItem.Href" onclick="NCIAnalytics.SearchResults(this,$resultItem.RecNumber);">
				$resultItem.LongTitle##
			</a>

			#if($showDate || $showDescription)##
				<div class="description">##
			#end##

			##
			## Show date if required
			##
			#if($showDate)
				#DrawBlogDate($resultItem $CDEContext)
			#end##

			##
			## Show description if required
			##
			#if($showDescription)
				#DrawDescription($resultItem)
			#end##

			<p>
				<a href="$resultItem.Href">$continueReading &gt;</a>
			</p>

			#if($showDate || $showLongDescription)##
				</div>##
			#end##
		</div>
	</li>
#end##

#macro(DrawImage $resultItem)
	<div class="list-item-image image container">
		#if($resultItem.ThumbnailURL)##
			<a class="item-image image" href="$resultItem.Href">##
				#set($alt = "image")##
				#if($resultItem.Alt)##
					#set($alt = "$resultItem.Alt")##
				#elseif($resultItem.AltText)##
					#set($alt = "$resultItem.AltText")##
				#else##
					#set($alt = "image")##
				#end##
				<img src="$resultItem.ThumbnailURL" alt="$alt"></img>
			</a>##
		#else##
			&nbsp;##
		#end##
	</div>
#end##

#macro(DrawDate $resultItem $CDEContext)
	<div class="date">##
		##
		## Display dates
		##
		#if($CDEContext.Language == "es")##
			$resultItem.DateForListsEs##
		#else##
			$resultItem.DateForLists##
		#end##
	</div>##
#end##

#macro(DrawDescription $resultItem)
	#if($resultItem.LongDescription)##
		<p>$resultItem.LongDescription</p>##
	#end##
#end##

#macro(DrawBlogDate $resultItem $CDEContext)
	<div class="date-author">
		#if($CDEContext.Language == "es")##
			$resultItem.DateForBlogsEs##
		#else##
			$resultItem.DateForBlogs,##
		#end##
		#if($resultItem.Author.length()>0)##
			$by $resultItem.Author##
		#else##
			&nbsp;##
		#end##
	</div>
#end##
