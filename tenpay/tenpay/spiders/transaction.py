# -*- coding: utf-8 -*-
import json
import logging
import time

import scrapy


class TransactionSpider(scrapy.Spider):
    name = 'transaction'
    allowed_domains = ['tenpay.com']

    api = 'https://wx.tenpay.com/userroll/userrolllist?classify_type={}&count={}&sort_type={}&start_time={}'

    start_urls = [api.format(0, 20, 1, int(time.time()))]

    def parse(self, response):
        body = json.loads(response.body_as_unicode())
        if body['ret_code'] != 0:
            logging.error(body['ret_msg'])
            return

        if body is None or body['record'] is None:
            return

        last_create_time = body['last_create_time']
        yield {last_create_time: body}
        yield scrapy.Request(url=self.api.format(0, 20, 1, last_create_time), callback=self.parse)
