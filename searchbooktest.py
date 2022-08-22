from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options 
import time
driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get("http://localhost:8000/new1")
driver.maximize_window()
time.sleep(3)
searchbook=driver.find_element_by_xpath("//nav[@id='navbar']/ul//a[@href='/sb']")
searchbook.click()
time.sleep(2)
a=driver.find_element_by_name("book_id")
a.send_keys("4")
time.sleep(1)
b=driver.find_element_by_xpath("//body/form[@action='/sb']//button[@type='submit']")
b.click()

