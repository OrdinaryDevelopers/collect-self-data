# -*- coding: utf-8 -*-
import json
import time
import urllib
import urllib.parse

import scrapy


class HistorySpider(scrapy.Spider):
    name = 'history'
    allowed_domains = ['common.diditaxi.com.cn']

    custom_settings = {
        'token': 'your token',
        'timemode': '',
        'phone': '',
        'pagenum': 0,
        'appversion': '5.3.6',
        'openid': 'general_app',
        'datatype': 'webapp',
        'apiver': '2.0.0',
    }

    end_year = 201401

    # dd03-ndhxQykv92QO%2BUobQgT5n3roCZJSKh4HODwHsKSPCZJTNlpAuXe6muVYcIQTNEWJotYalQhYbOXo1aQfzXkLn%2BxycPQl%2BBmcP0r5kzqTbIQo4dfKRir4mukTb2k
    # dd03-lwOv2N7ZBhbiz9ULOzk3EJ0ScaimvFafQRVNavGRcainyBV7Y%2BL4FJ%2BuCrbny%2FSdSKrgG34uDA8kOVqHx%2BTJEzgwCBbpzlwMRpY30%2BJpDrbkRq5eP3Y6FJ7pDhL

    def start_requests(self):
        time_mode = time.strftime("%Y%m", time.localtime())
        yield scrapy.Request(url=self.build_api(time_mode), callback=self.parse,
                             meta={'timemode': time_mode})

    def parse(self, response):
        body = json.loads(response.body_as_unicode())
        time_mode = response.meta['timemode']

        if body['order_done'] is not None:
            yield {time_mode: body}

        if int(time_mode) < self.end_year:
            return

        next_time_mode = body['timemode']
        yield scrapy.Request(url=self.build_api(next_time_mode), callback=self.parse, meta={'timemode': next_time_mode})

    def build_api(self, time_mode):
        self.custom_settings['timemode'] = time_mode
        return 'https://common.diditaxi.com.cn/passenger/history?{}'.format(
            urllib.parse.urlencode(self.custom_settings))
