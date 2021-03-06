<?php

namespace JuristBundle\Services;

/**
    *
    * Extension for SimpleXMLElement
    * @author Alexandre FERAUD
    * Взято по адресу http://php.net/manual/ru/simplexmlelement.addchild.php
    *
*/ 
class ExSimpleXMLElement
{

    public function create(string $root)
    {
        $exe = new class($root, LIBXML_NOWARNING|LIBXML_NOERROR|LIBXML_PARSEHUGE) extends \SimpleXMLElement {
            /**
                * Add CDATA text in a node
                * @param string $cdata_text The CDATA value  to add
            */
            private function addCData($cdata_text)
            {
                $node= dom_import_simplexml($this);
                $no = $node->ownerDocument;
                $node->appendChild($no->createCDATASection($cdata_text));
            }

            /**
                * Create a child with CDATA value
                * @param string $name The name of the child element to add.
                * @param string $cdata_text The CDATA value of the child element.
                * @param string $ns Namespace
            */
            public function addChildCData($name, $cdata_text, $ns = null)
            {
                $child = $ns ?? false ? $this->addChild($name, '', $ns) : $this->addChild($name);
                $child->addCData($cdata_text);
            }

            /**
                * Add SimpleXMLElement code into a SimpleXMLElement
                * @param \SimpleXMLElement $append
            */
            public function appendXML($append)
            {
                if ($append) {
                    if (strlen(trim((string) $append))==0) {
                        $xml = $this->addChild($append->getName());
                        foreach($append->children() as $child) {
                            $xml->appendXML($child);
                        }
                    } else {
                        $xml = $this->addChild($append->getName(), (string) $append);
                    }

                    foreach($append->attributes() as $n => $v) {
                        $xml->addAttribute($n, $v);
                    }
                }
            }
        };

        return $exe;
    }

}