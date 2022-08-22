from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options 
import time
driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get("http://localhost:8000/login")
driver.maximize_window()
a=driver.find_element_by_name("uname")
a.send_keys("yash")
b=driver.find_element_by_name("psw")
b.send_keys("yash@123")
time.sleep(3)
c=driver.find_element_by_xpath("//body/form[@action='/login']//button[@type='submit']")
c.click()


