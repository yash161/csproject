from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options 
import time
driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get("http://localhost:8000/new1")
driver.maximize_window()
time.sleep(3)
searchbook=driver.find_element_by_xpath("//nav[@id='navbar']/ul//a[@href='/book']")
searchbook.click()
time.sleep(2)
a=driver.find_element_by_xpath("//body/form[@action='/book']//input[@name='user_id']")
a.send_keys("2")
time.sleep(1)
b=driver.find_element_by_xpath("//body/form[@action='/book']//button[@type='submit']")
b.click()

