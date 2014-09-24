<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.Configuration"
    TagPrefix="Config" %>
<!doctype html>
<html>
<head id="header" runat="server">
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body id="Body1" runat="server">
<!-- CGov Container -->
<div id="cgovContainer"> 
<!-- Language Toggle -->
<div class="languageToggle" align="right">
<NCI:LanguageToggleControl ID="LangList1" runat="server">
	<LanguageToggleLanguages>
		<NCI:LanguageToggleLanguageItem Language="en">
			<LangsCollection>
				<NCI:LanguageToggle Locale="es-us" Name="Spanish" Title="Español" Url="/espanol" OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
				<NCI:LanguageToggle Locale="pt-br" Name="Portuguese" Title="Português" OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
				<NCI:LanguageToggle Locale="zh-cn" Name="Chinese" Title="中文" OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" /> 
			</LangsCollection>
		</NCI:LanguageToggleLanguageItem>
		<NCI:LanguageToggleLanguageItem Language="es">
			<LangsCollection>
				<NCI:LanguageToggle Locale="en-us" Name="English" Title="English" Url="/" OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
				<NCI:LanguageToggle Locale="pt-br" Name="Portuguese" Title="Português" OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
				<NCI:LanguageToggle Locale="zh-cn" Name="Chinese" Title="中文" OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" /> 
			</LangsCollection>
		</NCI:LanguageToggleLanguageItem>
		<NCI:LanguageToggleLanguageItem Language="pt">
			<LangsCollection>
				<NCI:LanguageToggle Locale="en-us" Name="English" Title="English" Url="/" OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
				<NCI:LanguageToggle Locale="es-us" Name="Spanish" Title="Español" Url="/espanol" OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
				<NCI:LanguageToggle Locale="zh-cn" Name="Chinese" Title="中文" OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" /> 
			</LangsCollection>
		</NCI:LanguageToggleLanguageItem>
		<NCI:LanguageToggleLanguageItem Language="zh">
			<LangsCollection>
				<NCI:LanguageToggle Locale="en-us" Name="English" Title="English" Url="/" OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
				<NCI:LanguageToggle Locale="es-us" Name="Spanish" Title="Español" Url="/espanol" OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
				<NCI:LanguageToggle Locale="pt-br" Name="Portuguese" Title="Português" OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
			</LangsCollection>
		</NCI:LanguageToggleLanguageItem>
	</LanguageToggleLanguages>
</NCI:LanguageToggleControl>
</div>
  <!-- Site Banner and main navigation -->
  <div class="skip"><a title="Skip to content" href="#skiptocontent">Skip to content</a></div>
  <NCI:TemplateSlot ID="cgvSiteBanner" runat="server" />
  <NCI:TemplateSlot ID="cgvMainNav" runat="server" />
  <!-- End Site Banner and main navigation --> 
  <!-- Content Header -->
  <div id="headerzone clearfix">
    <NCI:TemplateSlot ID="cgvContentHeader" runat="server" />
    <NCI:TemplateSlot ID="cgvLanguage" runat="server" />
	<!--Page Options Bar-->
	<div class="page-options">
		<NCI:PageOptionsControl ID="PageOptionsControl1" runat="server">
			<PageOptionsButtonLanguages>
				<NCI:PageOptionsButtonLanguageItem Language="en">
					<ButtonsCollection>
						<NCI:EmailButtonItem Title="email" CssClass="po-email" AlternateContentVersionKey="email" WebAnalytics="NCIAnalytics.eMailLink(this);" />
						<NCI:LinkButtonItem Title="Print" CssClass="po-print" AlternateContentVersionKey="print" WebAnalytics="NCIAnalytics.PrintLink(this);" />
						<NCI:LinkButtonItem Title="View All" CssClass="po-view-entire-document" AlternateContentVersionKey="viewall" />
						<NCI:PageOptionsAddThisButtonItem Service="facebook" Title="Facebook" CssClass="po-facebook" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
						<NCI:PageOptionsAddThisButtonItem Service="twitter" Title="Twitter" CssClass="po-twitter" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
						<NCI:PageOptionsAddThisButtonItem Service="google_plusone_share" Title="Google+" CssClass="po-googleplus" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
						<NCI:PageOptionsAddThisButtonItem Service="pinterest_share" Title="Pinterest" CssClass="po-pinterest" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
					</ButtonsCollection>
				</NCI:PageOptionsButtonLanguageItem>
				<NCI:PageOptionsButtonLanguageItem Language="es">
					<ButtonsCollection>
						<NCI:EmailButtonItem Title="email" CssClass="po-email" AlternateContentVersionKey="email" WebAnalytics="NCIAnalytics.eMailLink(this);" />
						<NCI:LinkButtonItem Title="Print" CssClass="po-print" AlternateContentVersionKey="print" WebAnalytics="NCIAnalytics.PrintLink(this);" />
						<NCI:LinkButtonItem Title="View All" CssClass="po-view-entire-document" AlternateContentVersionKey="viewall" />
						<NCI:PageOptionsAddThisButtonItem Service="facebook" Title="Facebook" CssClass="po-facebook" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
						<NCI:PageOptionsAddThisButtonItem Service="twitter" Title="Twitter" CssClass="po-twitter" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
						<NCI:PageOptionsAddThisButtonItem Service="google_plusone_share" Title="Google+" CssClass="po-googleplus" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
						<NCI:PageOptionsAddThisButtonItem Service="pinterest_share" Title="Pinterest" CssClass="po-pinterest" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
					</ButtonsCollection>
				</NCI:PageOptionsButtonLanguageItem>
			</PageOptionsButtonLanguages>
		</NCI:PageOptionsControl>
	</div>
  </div>
  <!-- Main Area --> 
  <!-- Left Navigation and Content Area -->
  <div id="mainContainer"> 
    <!-- Left Nav Column -->
    <div class="leftzone">
    <NCI:TemplateSlot ID="cgvFindACancerTypeSlot" runat="server" CssClass="LeftNavSlot" />
      <NCI:TemplateSlot ID="cgvSectionNav" runat="server" CssClass="LeftNavSlot" />      
      <NCI:TemplateSlot ID="cgvLeftNav" runat="server" CssClass="LeftNavSlot" />
    </div>
    <!-- End Left Nav --> 
    <!-- Main Content Area -->
    <div class="contentzone"> 
    <a id="skiptocontent" tabindex="1"></a>
      <NCI:TemplateSlot ID="cgvPublicArchiveBannerSl" runat="server" />
      <NCI:TemplateSlot ID="cgvBodyHeader" runat="server" />
      <div class="cancertypecontent clearfix">
      	<NCI:TemplateSlot ID="cgvPageTitleSl" runat="server" />
        <NCI:TemplateSlot ID="cgvCdrDefinition" runat="server" />
        <NCI:TemplateSlot ID="cgvBody" runat="server" />
		<NCI:TemplateSlot ID="cgvDate" runat="server" />
      </div>
    </div>
    <!-- End Content Area --> 
    <!-- End Main Area --> 
  </div>
  <!-- End Left Navigation and Content Area --> 
  <!-- Footer -->
  <NCI:TemplateSlot ID="cgvFooter" runat="server" RemoveIfEmpty="false" />
  <!-- End Foooter--> 
  <!-- TO INSERT WEB ANALYTICS CODE. Every template should have this 
    control else Web analytics scripts will not show up in the HTML-->
  <NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
</div>
<!-- END CGov Container -->
</body>
</html>