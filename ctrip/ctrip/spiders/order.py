# -*- coding: utf-8 -*-
import scrapy


class OrderSpider(scrapy.Spider):
    name = 'order'
    allowed_domains = ['ctrip.com']
    start_urls = ['https://my.ctrip.com/myinfo/all']

    def parse(self, response):
        orders = response.css('#base_bd > div.main > div > div.orders_list.mb20 > ul.t_body > a')

        result = []
        for order in orders:
            url = order.css('a::attr(href)').get()
            title = order.css('li > div > div.order-info > ul > li:nth-child(1) > span::text').get()
            address = order.css('li > div > div.order-info > ul > li:nth-child(2) > span::text').get()
            time = order.css('li > div > div.order-info > ul > li:nth-child(3) > span::text').get()
            person = order.css('li > div > div.order-info > ul > li:nth-child(4) > span::text').get()
            price = order.css('li > div > div.order-price-group > div.order-price-detail > div::text').get()
            status = order.css('li > div > div.order-price-group > div.order-price-status > div::text').get()

            result.append({
                url,
                title,
                address,
                time,
                person,
                price,
                status
            })

        yield {response.url: result}
