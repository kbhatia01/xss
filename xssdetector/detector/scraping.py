import requests
import re
import sys

def parser(html):
    script_str = re.findall('<script>.+?</script>',html)
    encoded_str = re.findall('%3C.+?%3D', html)
    # implicit_vectors = re.findall('<.+?>', html)
    input_vectors = re.findall('<input.+?>', html)

    final_list = []

    # for vector in implicit_vectors:
    #     if len(vector) > 10 and len(vector) < 2000:
    #         final_list.append(vector)
    for enc in encoded_str:
        if len(enc) > 10 and len(enc) < 2000:
            final_list.append(enc)
    for in_vec in input_vectors:
        if len(in_vec) > 10 and len (in_vec) < 2000:
            final_list.append(in_vec)

    for script in script_str:
        if len(script) < 2000:
            final_list.append(script)

    for item in final_list:
        item = re.sub("\n", "", item)
        item = re.sub("\t", "", item)
        item.strip()

    return final_list



def scraper(url):
    try:
        r = requests.get(url)
        soup = str(r.content)
        soup += "\n" + url
        return parser(soup)
    except Exception as e:
        print('The scraping job failed. See exception: {}'.format(e))
