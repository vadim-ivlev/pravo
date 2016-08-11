<?php

namespace JuristBundle\Entity;

/**
 * OriginalAuthor
 */
class OriginalAuthor
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var \DateTime
     */
    private $dateModefieded;

    /**
     * @var integer
     */
    private $questionId;

    /**
     * @var string
     */
    private $firstName;

    /**
     * @var string
     */
    private $lastName;

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
     * Set dateModefieded
     *
     * @param \DateTime $dateModefieded
     *
     * @return Questions
     */
    public function setDateModefieded($dateModefieded)
    {
        $this->dateModefieded = $dateModefieded;

        return $this;
    }

    /**
     * Get dateModefieded
     *
     * @return \DateTime
     */
    public function getDateModefieded()
    {
        return $this->dateModefieded;
    }

    /**
     * Set questionId
     *
     * @param integer $questionId
     *
     * @return OriginalAuthor
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
     * Set firstName
     *
     * @param string $firstName
     *
     * @return OriginalAuthor
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     *
     * @return OriginalAuthor
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return OriginalAuthor
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
     * @return OriginalAuthor
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
     * @return OriginalAuthor
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
