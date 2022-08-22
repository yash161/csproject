l1=list(map(int, input().split()))
l2=list(map(int, input().split()))
c1=c2=c3=c4=c5=c6=0
for i in range(0,len(l1)):
    if l1[i]>l2[i]:
        c1=c1+1
    elif l2[i]>l1[i]:
        c2=c2+1
    else:
       c5=c6=0
print(f"{c1+c5} {c2+c6}")
