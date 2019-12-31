# -*- coding: utf-8 -*-

# Scrapy settings for ctrip project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://doc.scrapy.org/en/latest/topics/settings.html
#     https://doc.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://doc.scrapy.org/en/latest/topics/spider-middleware.html

COOKIE = 'abtest_userid=60e9c1d0-6da6-4491-8915-14f6cb25b9eb; _RDG=28aa2419e169cb2f643b5ead631cf8fa9a; _RSG=1La3TI3haLCzIp75GTJYiA; _RF1=58.61.251.224; _RGUID=c564ac34-9d0e-4541-ab22-4dd4051f34bd; UUID=80C1433BA25948798D203A6F514E8765; IsPersonalizedLogin=F; _ga=GA1.2.655351557.1577772817; _gid=GA1.2.1033631889.1577772817; _gac_UA-3748357-1=1.1577772817.CjwKCAiA3abwBRBqEiwAKwICAygsIVjhAfyJ7MBSyAI8t4U2qs3y9Lb9h7QDethPb2RDpwoYYSj_VBoC5MMQAvD_BwE; MKT_OrderClick=ASID=48992611971CjwKCAiA3abwBRBqEiwAKwICAygsIVjhAfyJ7MBSyAI8t4U2qs3y9Lb9h7QDethPb2RDpwoYYSj_VBoC5MMQAvD_BwE&AID=4899&CSID=2611971&OUID=china&CT=1577772816636&CURL=https%3A%2F%2Fwww.ctrip.com%2F%3Fsid%3D2611971%26allianceid%3D4899%26ouid%3Dchina%26gclid%3DCjwKCAiA3abwBRBqEiwAKwICAygsIVjhAfyJ7MBSyAI8t4U2qs3y9Lb9h7QDethPb2RDpwoYYSj_VBoC5MMQAvD_BwE%26gclsrc%3Daw.ds&VAL={"pc_vid":"1577772791525.1p5yep"}; MKT_CKID=1577772816669.qaq97.frmu; MKT_CKID_LMT=1577772816670; _gcl_aw=GCL.1577772817.CjwKCAiA3abwBRBqEiwAKwICAygsIVjhAfyJ7MBSyAI8t4U2qs3y9Lb9h7QDethPb2RDpwoYYSj_VBoC5MMQAvD_BwE; _gcl_dc=GCL.1577772817.CjwKCAiA3abwBRBqEiwAKwICAygsIVjhAfyJ7MBSyAI8t4U2qs3y9Lb9h7QDethPb2RDpwoYYSj_VBoC5MMQAvD_BwE; MKT_Pagesource=PC; Union=AllianceID=1881&SID=2209&OUID=EA46FC24EF581C576129D61073B97CFA%7C100.1030.00.000.00; Session=SmartLinkCode=U2209&SmartLinkKeyWord=&SmartLinkQuary=&SmartLinkHost=&SmartLinkLanguage=zh; cticket=F6764B2BFA9670F152B68C95B089E335D6C0CD68129ABD00A9D9626D2E0DB42A; AHeadUserInfo=VipGrade=10&VipGradeName=%BB%C6%BD%F0%B9%F3%B1%F6&UserName=&NoReadMessageCount=0; ticket_ctrip=bJ9RlCHVwlu1ZjyusRi+ypZ7X2r4+yojbpFYEaO9BrThhZD5IIaa4z2PJNOXSxCtPCeqwpjFOELrItkiqoNAhjKdMpax/A2XQsHfaPRIEbXBf75clLjVikdn1U+YZc7hkczx65DgfCBP6r0NHIIPcZm1JBfnVYviA5s8/Tzfo+pbhFbcb+6V1j9+TqJkVfIksgcO5WQTpM5fZCKW2iaPy52+QnUfe2EirLG8kwPJWzWy29Hpvsc7s8ECegT35th7OZm1dUV3aAlfX6M0CZ/V9U2RNcFstwCeKwOKwWiis4M=; DUID=u=EC3BE07F8678E2DF28E1EB764CB9D3FC&v=0; IsNonUser=F; _jzqco=%7C%7C%7C%7C%7C1.345919686.1577772816665.1577772816665.1577777889212.1577772816665.1577777889212.0.0.0.2.2; __zpspc=9.2.1577777889.1577777889.1%234%7C%7C%7C%7C%7C%23; _bfs=1.9; _bfa=1.1577772791525.1p5yep.1.1577772791525.1577777140690.2.23; _bfi=p1%3D10320642560%26p2%3D10320642560%26v1%3D23%26v2%3D22; _gat=1'

BOT_NAME = 'ctrip'

SPIDER_MODULES = ['ctrip.spiders']
NEWSPIDER_MODULE = 'ctrip.spiders'


# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'ctrip (+http://www.yourdomain.com)'

# Obey robots.txt rules
ROBOTSTXT_OBEY = True

# Configure maximum concurrent requests performed by Scrapy (default: 16)
#CONCURRENT_REQUESTS = 32

# Configure a delay for requests for the same website (default: 0)
# See https://doc.scrapy.org/en/latest/topics/settings.html#download-delay
# See also autothrottle settings and docs
#DOWNLOAD_DELAY = 3
# The download delay setting will honor only one of:
#CONCURRENT_REQUESTS_PER_DOMAIN = 16
#CONCURRENT_REQUESTS_PER_IP = 16

# Disable cookies (enabled by default)
COOKIES_ENABLED = False

# Disable Telnet Console (enabled by default)
#TELNETCONSOLE_ENABLED = False

# Override the default request headers:
DEFAULT_REQUEST_HEADERS = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en',
  'Cookie': COOKIE
}

# Enable or disable spider middlewares
# See https://doc.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    'ctrip.middlewares.CtripSpiderMiddleware': 543,
#}

# Enable or disable downloader middlewares
# See https://doc.scrapy.org/en/latest/topics/downloader-middleware.html
DOWNLOADER_MIDDLEWARES = {
   'ctrip.middlewares.CtripDownloaderMiddleware': 1,
}

# Enable or disable extensions
# See https://doc.scrapy.org/en/latest/topics/extensions.html
#EXTENSIONS = {
#    'scrapy.extensions.telnet.TelnetConsole': None,
#}

# Configure item pipelines
# See https://doc.scrapy.org/en/latest/topics/item-pipeline.html
#ITEM_PIPELINES = {
#    'ctrip.pipelines.CtripPipeline': 300,
#}

# Enable and configure the AutoThrottle extension (disabled by default)
# See https://doc.scrapy.org/en/latest/topics/autothrottle.html
#AUTOTHROTTLE_ENABLED = True
# The initial download delay
#AUTOTHROTTLE_START_DELAY = 5
# The maximum download delay to be set in case of high latencies
#AUTOTHROTTLE_MAX_DELAY = 60
# The average number of requests Scrapy should be sending in parallel to
# each remote server
#AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
# Enable showing throttling stats for every response received:
#AUTOTHROTTLE_DEBUG = False

# Enable and configure HTTP caching (disabled by default)
# See https://doc.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
#HTTPCACHE_ENABLED = True
#HTTPCACHE_EXPIRATION_SECS = 0
#HTTPCACHE_DIR = 'httpcache'
#HTTPCACHE_IGNORE_HTTP_CODES = []
#HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'

# Output character encoding
FEED_EXPORT_ENCODING = 'utf-8'
