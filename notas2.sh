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
else 
 if [ -d ~/Documentos/$1 ];then
    if [ -e ~/Documentos/$1/$2 ];then
        #Directorio y archivo existen
        nano ~/Documentos/$1/$2
    else
        #Directorio existe pero archivo no
        touch ~/Documentos/$1/$2
        echo 'Archivo creado'
        nano ~/Documentos/$1/$2 
    fi
 else
    #Ni directorio ni archivo existen
    mkdir ~/Documentos/$1
    echo 'Directorio creado'
    touch ~/Documentos/$1/$2
    echo 'Archivo creado'
    nano ~/Documentos/$1/$2     
 fi 
fi
fi