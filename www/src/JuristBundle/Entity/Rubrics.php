<?php

namespace JuristBundle\Entity;

/**
 * Rubrics
 */
class Rubrics
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $jurists;

    /**
     * @var integer
     */
    private $authUsers;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $companies;

    /**
     * @var string
     */
    private $CPUName;

    /**
     * @var integer
     */
    private $tags;

    /**
     * @var integer
     */
    private $questions;

    /**
     * @var string
     */
    private $title;

    /**
     * @var string
     */
    private $description;

    /**
     * @var string
     */
    private $titleForBlock;

    /**
     * @var string
     */
    private $descriptionForBlock;

    /**
     * @var \DateTime
     */
    private $createdAt;

    /**
     * @var \DateTime
     */
    private $editedAt;


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
     * Set name
     *
     * @param string $name
     *
     * @return Rubrics
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
     * Set jurists
     *
     * @param string $jurists
     *
     * @return Rubrics
     */
    public function setJurists($jurists)
    {
        $this->jurists = $jurists;

        return $this;
    }

    /**
     * Get jurists
     *
     * @return string
     */
    public function getJurists()
    {
        return $this->jurists;
    }

    /**
     * Set jurists
     *
     * @param string $authUsers
     *
     * @return Rubrics
     */
    public function setAuthUsers($authUsers)
    {
        $this->authUsers = $authUsers;

        return $this;
    }

    /**
     * Get authUsers
     *
     * @return string
     */
    public function getAuthUsers()
    {
        return $this->authUsers;
    }

    /**
     * Set companies
     *
     * @param integer $companies
     *
     * @return string
     */
    public function setCompanies($companies)
    {
        $this->companies = $companies;

        return $this;
    }

    /**
     * Get CPUName
     *
     * @return integer
     */
    public function getCPUName()
    {
        return $this->CPUName;
    }

    /**
     * Set companies
     *
     * @param integer $CPUName
     *
     * @return string
     */
    public function setCPUName($CPUName)
    {
        $this->CPUName = $CPUName;

        return $this;
    }

    /**
     * Get companies
     *
     * @return integer
     */
    public function getCompanies()
    {
        return $this->companies;
    }

    /**
     * Set tags
     *
     * @param string $tags
     *
     * @return Rubrics
     */
    public function setTags($tags)
    {
        $this->tags = $tags;

        return $this;
    }

    /**
     * Get tags
     *
     * @return integer
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * Set questions
     *
     * @param integer $questions
     *
     * @return Rubrics
     */
    public function setQuestions($questions)
    {
        $this->questions = $questions;

        return $this;
    }

    /**
     * Get questions
     *
     * @return integer
     */
    public function getQuestions()
    {
        return $this->questions;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Rubrics
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Rubrics
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set titleForBlock
     *
     * @param string $titleForBlock
     *
     * @return Rubrics
     */
    public function setTitleForBlock($titleForBlock)
    {
        $this->titleForBlock = $titleForBlock;

        return $this;
    }

    /**
     * Get titleForBlock
     *
     * @return string
     */
    public function getTitleForBlock()
    {
        return $this->titleForBlock;
    }

    /**
     * Set descriptionForBlock
     *
     * @param string $descriptionForBlock
     *
     * @return Rubrics
     */
    public function setDescriptionForBlock($descriptionForBlock)
    {
        $this->descriptionForBlock = $descriptionForBlock;

        return $this;
    }

    /**
     * Get descriptionForBlock
     *
     * @return string
     */
    public function getDescriptionForBlock()
    {
        return $this->descriptionForBlock;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Rubrics
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set editedAt
     *
     * @param \DateTime $editedAt
     *
     * @return Rubrics
     */
    public function setEditedAt($editedAt)
    {
        $this->editedAt = $editedAt;

        return $this;
    }

    /**
     * Get editedAt
     *
     * @return \DateTime
     */
    public function getEditedAt()
    {
        return $this->editedAt;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->companies = new \Doctrine\Common\Collections\ArrayCollection();
        $this->tags = new \Doctrine\Common\Collections\ArrayCollection();
        $this->questions = new \Doctrine\Common\Collections\ArrayCollection();
        $this->jurists = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add company
     *
     * @param \JuristBundle\Entity\Companies $company
     *
     * @return Rubrics
     */
    public function addCompany(\JuristBundle\Entity\Companies $company)
    {
        $this->companies[] = $company;

        return $this;
    }

    /**
     * Remove company
     *
     * @param \JuristBundle\Entity\Companies $company
     */
    public function removeCompany(\JuristBundle\Entity\Companies $company)
    {
        $this->companies->removeElement($company);
    }

    /**
     * Add tag
     *
     * @param \JuristBundle\Entity\Tags $tag
     *
     * @return Rubrics
     */
    public function addTag(\JuristBundle\Entity\Tags $tag)
    {
        $this->tags[] = $tag;

        return $this;
    }

    /**
     * Remove tag
     *
     * @param \JuristBundle\Entity\Tags $tag
     */
    public function removeTag(\JuristBundle\Entity\Tags $tag)
    {
        $this->tags->removeElement($tag);
    }

    /**
     * Add question
     *
     * @param \JuristBundle\Entity\Questions $question
     *
     * @return Rubrics
     */
    public function addQuestion(\JuristBundle\Entity\Questions $question)
    {
        $this->questions[] = $question;

        return $this;
    }

    /**
     * Remove question
     *
     * @param \JuristBundle\Entity\Questions $question
     */
    public function removeQuestion(\JuristBundle\Entity\Questions $question)
    {
        $this->questions->removeElement($question);
    }

    /**
     * Add AuthUsers
     *
     * @param \JuristBundle\Entity\AuthUsers $authUsers
     *
     * @return Rubrics
     */
    public function addAuthUsers(\JuristBundle\Entity\AuthUsers $authUsers)
    {
        $this->authUsers[] = $authUsers;

        return $this;
    }

    /**
     * Remove authUsers
     *
     * @param \JuristBundle\Entity\AuthUsers $jurist
     */
    public function removeAuthUsers(\JuristBundle\Entity\AuthUsers $authUsers)
    {
        $this->authUsers->removeElement($authUsers);
    }

    /**
     * Add jurist
     *
     * @param \JuristBundle\Entity\Jurists $jurist
     *
     * @return Rubrics
     */
    /*public function addJurist(\JuristBundle\Entity\Jurists $jurist)
    {
        $this->jurists[] = $jurist;

        return $this;
    }*/

    /**
     * Remove jurist
     *
     * @param \JuristBundle\Entity\Jurists $jurist
     */
    /*public function removeJurist(\JuristBundle\Entity\Jurists $jurist)
    {
        $this->jurists->removeElement($jurist);
    }*/
}
