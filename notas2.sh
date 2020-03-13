#!/bin/bash
# Use espacios!!
if [ $1 == "" ] || [ $1 == "-h" ];then
echo "Pantalla de ayuda"
else if [ $1 == "-v" ];then
    carpetas=$(ls ~/Documentos)
    for i in $carpetas;do 
        if [ -d ~/Documentos/$i ];then
            #Cantidad de archivos
            totaldearchivos=$(ls ~/Documentos/$i |wc -w)
            #echo $totaldearchivos
            echo "En la carpeta $i hay $totaldearchivos archivos "
        fi
    done
fi
fi