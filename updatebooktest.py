from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options 
import time
driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get("http://localhost:8000/new1")
driver.maximize_window()
time.sleep(3)
updatebook=driver.find_element_by_xpath("//nav[@id='navbar']/ul//a[@href='/pay']")
updatebook.click()
time.sleep(2)
bid=driver.find_element_by_name("book_id")
bid.send_keys("2")
bookname=driver.find_element_by_name("bookname")
bookname.send_keys("pritam")
author=driver.find_element_by_name("author")
author.send_keys("xyz")
price=driver.find_element_by_name("price")
price.send_keys("12343")
time.sleep(5)
submit=driver.find_element_by_xpath("//body/form[@action='/pay']//button[@type='submit']")
submit.click()