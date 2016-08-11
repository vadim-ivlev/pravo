<?php

namespace JuristBundle\Entity;

/**
 * Author
 */
class Author
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $questionId;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $email;

    /**
     * @var string
     */
    private $city;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set questionId
     *
     * @param integer $questionId
     *
     * @return Author
     */
    public function setQuestionId($questionId)
    {
        $this->questionId = $questionId;

        return $this;
    }

    /**
     * Get questionId
     *
     * @return integer
     */
    public function getQuestionId()
    {
        return $this->questionId;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Author
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return Author
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set city
     *
     * @param string $city
     *
     * @return Author
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     *
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->questionId = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add questionId
     *
     * @param \JuristBundle\Entity\Questions $questionId
     *
     * @return Author
     */
    public function addQuestionId(\JuristBundle\Entity\Questions $questionId)
    {
        $this->questionId[] = $questionId;

        return $this;
    }

    /**
     * Remove questionId
     *
     * @param \JuristBundle\Entity\Questions $questionId
     */
    public function removeQuestionId(\JuristBundle\Entity\Questions $questionId)
    {
        $this->questionId->removeElement($questionId);
    }
}
